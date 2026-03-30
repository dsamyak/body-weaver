import { useRef, useState, useMemo, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BodyPartData } from '@/data/bodyParts';

interface BodyPart3DProps {
  part: BodyPartData;
  isSelected: boolean;
  isFiltered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  isHovered: boolean;
}

const getAnimConfig = (id: string) => {
  if (id === 'heart') return { breathe: 0, pulse: 1, speed: 1.5, type: 'heartbeat' };
  if (['lungs', 'ribcage'].includes(id)) return { breathe: 0.05, pulse: 0, speed: 2.0, type: 'breath' };
  if (['stomach', 'liver'].includes(id)) return { breathe: 0.02, pulse: 0, speed: 2.0, type: 'breath' };
  if (['skull', 'brain', 'eyes', 'neck'].includes(id)) return { breathe: 0.008, pulse: 0, speed: 0.8, bobY: 0.008, type: 'float' };
  if (id.includes('arm') || id.includes('hand') || id.includes('shoulder') || id.includes('leg') || id.includes('foot'))
    return { breathe: 0, pulse: 0, speed: 1, sway: 0.012, type: 'sway' };
  return { breathe: 0.005, pulse: 0, speed: 1, type: 'default' };
};

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  
  void main() {
    #include <beginnormal_vertex>
    #include <defaultnormal_vertex>
    #include <begin_vertex>
    // project_vertex calculates mvPosition and gl_Position
    #include <project_vertex>
    
    // We compute local position for scanning based on object space before transform
    vPosition = position;
    
    vNormal = normalize(transformedNormal);
    vViewPosition = -mvPosition.xyz;
  }
`;

const fragmentShader = `
  uniform float time;
  uniform vec3 color;
  uniform float emissiveIntensity;
  uniform float opacity;
  uniform float isOrgan;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  
  // Basic 3D Simplex
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }
  
  void main() {
    // Only attempt to read normal if length > 0
    vec3 normal = length(vNormal) > 0.0 ? normalize(vNormal) : vec3(0.0, 0.0, 1.0);
    vec3 viewDir = length(vViewPosition) > 0.0 ? normalize(vViewPosition) : vec3(0.0, 0.0, 1.0);

    // Fresnel Edge Glow
    float fresnel = dot(normal, viewDir);
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    fresnel = pow(fresnel, 2.5); // Sharp edges
    
    // Medical Scan Line
    float scan = fract(vPosition.y * 2.0 - time * 0.8);
    float scanLine = smoothstep(0.95, 1.0, scan) * 1.5;
    
    // Procedural Veins / Folds
    float noiseVal = 0.0;
    if (isOrgan > 0.5) {
      noiseVal = snoise(vPosition * 8.0 + time * 0.1) * 0.5 + 0.5;
      noiseVal = smoothstep(0.6, 0.8, noiseVal) * 1.0;
    }
    
    // Enhanced Futuristic Coloring
    vec3 coreColor = color * 0.35; // Brighter core for solid readability
    vec3 rimColor = color * 1.6;  // Bright edges
    vec3 blendedColor = mix(coreColor, rimColor, fresnel);
    
    // Use the emissiveIntensity uniform (which lerps up on hover) to create a visual "fill" effect
    float hoverBoost = smoothstep(0.1, 0.7, emissiveIntensity);
    
    vec3 finalColor = blendedColor + (color * scanLine * 1.0) + (color * noiseVal * 0.8) + (color * hoverBoost * 0.6);
    
    // Adjust opacity: add a baseline of 0.4 so the physical volume of the body part is easily seen!
    float baseOpacity = 0.4 + (fresnel * 0.6) + (scanLine * 0.3) + (noiseVal * 0.3);
    float finalOpacity = (baseOpacity + hoverBoost * 0.4) * opacity;
    finalOpacity = clamp(finalOpacity, 0.15, 1.0); // Minimum 15% opacity to never vanish
    
    // Bones are just as important to see, so dim them only slightly
    if (isOrgan < 0.5) {
       finalOpacity *= 0.85 + (hoverBoost * 0.15); 
    }

    // emissiveIntensity boosts the overall brightness
    gl_FragColor = vec4(finalColor * emissiveIntensity * 2.0, finalOpacity);
  }
`;

const SpineInstances = ({ material }: { material: any }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const discRef = useRef<THREE.InstancedMesh>(null);
  
  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 10; i++) {
      dummy.position.set(0, 1.5 - i * 0.35, -0.2);
      dummy.updateMatrix();
      if(meshRef.current) meshRef.current.setMatrixAt(i, dummy.matrix);
      
      dummy.position.set(0, 1.5 - i * 0.35 - 0.15, 0);
      dummy.updateMatrix();
      if(discRef.current) discRef.current.setMatrixAt(i, dummy.matrix);
    }
    if(meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
    if(discRef.current) discRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, 10]}>
        <boxGeometry args={[0.4, 0.2, 0.4]} />
        {material}
      </instancedMesh>
      <instancedMesh ref={discRef} args={[undefined, undefined, 10]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        {material}
      </instancedMesh>
    </group>
  );
};

const RibcageInstances = ({ material }: { material: any }) => {
  const ribsRef = useRef<THREE.InstancedMesh>(null);
  
  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 6; i++) {
       // Left
      dummy.position.set(-0.5, 0.8 - i * 0.3, 0);
      dummy.rotation.set(0, 0, -0.2 - i * 0.05);
      let scale = 0.6 - i * 0.05;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      if(ribsRef.current) ribsRef.current.setMatrixAt(i, dummy.matrix);
      
      // Right
      dummy.position.set(0.5, 0.8 - i * 0.3, 0);
      dummy.rotation.set(0, 0, 0.2 + i * 0.05);
      dummy.scale.set(-scale, scale, scale);
      dummy.updateMatrix();
      if(ribsRef.current) ribsRef.current.setMatrixAt(6 + i, dummy.matrix);
    }
    if(ribsRef.current) ribsRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      <instancedMesh ref={ribsRef} args={[undefined, undefined, 12]}>
        <torusGeometry args={[1, 0.08, 16, 32, Math.PI * 0.7]} />
        {material}
      </instancedMesh>
      <mesh position={[0, 0.1, 0.5]}>
        <boxGeometry args={[0.2, 1.8, 0.1]} />
        {material}
      </mesh>
    </group>
  );
};

const BodyPart3D = ({ part, isSelected, isFiltered, onSelect, onHover, isHovered }: BodyPart3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [localHover, setLocalHover] = useState(false);
  const animConfig = useMemo(() => getAnimConfig(part.id), [part.id]);
  const basePos = useMemo(() => new THREE.Vector3(...part.position), [part.position]);
  const baseScale = useMemo(() => new THREE.Vector3(...part.scale), [part.scale]);
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);
  const materialsRef = useRef<any[]>([]);

  const isOrgan = ['brain', 'heart', 'lungs', 'stomach', 'liver', 'kidneys', 'intestines', 'eyes'].includes(part.id);

  useLayoutEffect(() => {
    const materials: any[] = [];
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh || (child as THREE.InstancedMesh).isInstancedMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) materials.push(mesh.material);
        }
      });
    }
    materialsRef.current = materials;
  }, [part.id]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime + timeOffset;

    const targetEmissive = isSelected ? 3.0 : (localHover || isHovered) ? 1.0 : 0.35;
    const targetOpacity = isFiltered ? 1.0 : ((localHover || isHovered) ? 0.8 : 0.08);

    for (const mat of materialsRef.current) {
      if (mat.uniforms) {
        if (mat.uniforms.emissiveIntensity) {
          mat.uniforms.emissiveIntensity.value = THREE.MathUtils.lerp(mat.uniforms.emissiveIntensity.value, targetEmissive, delta * 8);
        }
        if (mat.uniforms.opacity) {
          mat.uniforms.opacity.value = THREE.MathUtils.lerp(mat.uniforms.opacity.value, targetOpacity, delta * 6);
        }
        if (mat.uniforms.time) {
          mat.uniforms.time.value = t;
        }
      }
    }

    let scaleX = baseScale.x;
    let scaleY = baseScale.y;
    let scaleZ = baseScale.z;

    if (animConfig.type === 'heartbeat') {
      const beatCycle = (t * animConfig.speed) % (Math.PI * 2);
      let pulse = Math.pow(Math.max(0, Math.sin(beatCycle * 2)), 8) * 0.15;
      pulse += Math.pow(Math.max(0, Math.sin((beatCycle + 0.3) * 2)), 8) * 0.1;
      scaleX *= (1 + pulse);
      scaleY *= (1 + pulse);
      scaleZ *= (1 + pulse);
    } else if (animConfig.type === 'breath') {
      const breathCycle = Math.sin(t * animConfig.speed);
      scaleX *= (1 + breathCycle * animConfig.breathe * 1.5);
      scaleY *= (1 + breathCycle * animConfig.breathe * 0.5);
      scaleZ *= (1 + breathCycle * animConfig.breathe * 1.2);
    } else {
      const breatheFactor = 1 + Math.sin(t * animConfig.speed) * animConfig.breathe;
      scaleX *= breatheFactor;
      scaleY *= breatheFactor;
      scaleZ *= breatheFactor;
    }

    groupRef.current.scale.set(scaleX, scaleY, scaleZ);

    const bobY = animConfig.bobY ? Math.sin(t * 0.8) * animConfig.bobY : 0;
    const sway = animConfig.sway ? Math.sin(t * 0.6) * animConfig.sway : 0;
    groupRef.current.position.set(
      basePos.x + sway,
      basePos.y + bobY,
      basePos.z
    );
  });

  const renderMaterial = (isInstanced = false) => {
    return (
      // @ts-ignore - The instancing prop is valid on ShaderMaterial instances but missing from R3F types
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        // @ts-ignore - The instancing prop is valid on ShaderMaterial instances but missing from R3F types
        instancing={isInstanced}
        uniforms={{
          time: { value: 0 },
          color: { value: new THREE.Color(part.color) },
          emissiveIntensity: { value: 0.1 },
          opacity: { value: 1.0 },
          isOrgan: { value: isOrgan ? 1.0 : 0.0 }
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    );
  };

  const renderGeometry = () => {
    switch (part.id) {
      case 'brain':
        return (
          <mesh>
            <sphereGeometry args={[1, 64, 64]} />
            {renderMaterial()}
          </mesh>
        );
      case 'lungs':
        return (
          <>
            <mesh position={[-0.6, 0, 0]} rotation={[0, 0, -0.1]}>
              <sphereGeometry args={[0.5, 32, 24]} />
              {renderMaterial()}
            </mesh>
            <mesh position={[0.6, 0, 0]} rotation={[0, 0, 0.1]}>
              <sphereGeometry args={[0.55, 32, 24]} />
              {renderMaterial()}
            </mesh>
          </>
        );
      case 'heart':
        return (
          <>
            <mesh position={[0, -0.2, 0]}>
              <sphereGeometry args={[0.7, 32, 32]} />
              {renderMaterial()}
            </mesh>
            <mesh position={[0.3, 0.5, 0]} rotation={[0, 0, 0.4]}>
              <cylinderGeometry args={[0.2, 0.2, 0.6, 16]} />
              {renderMaterial()}
            </mesh>
            <mesh position={[-0.2, 0.6, 0]} rotation={[0, 0, -0.3]}>
              <cylinderGeometry args={[0.15, 0.15, 0.5, 16]} />
              {renderMaterial()}
            </mesh>
          </>
        );
      case 'ribcage':
        return <RibcageInstances material={renderMaterial(true)} />;
      case 'spine':
        return <SpineInstances material={renderMaterial(true)} />;
      case 'stomach':
      case 'liver':
        return (
          <mesh scale={[1.2, 0.8, 1]} rotation={[0, 0, part.id === 'liver' ? -0.2 : 0.2]}>
            <sphereGeometry args={[0.8, 32, 32]} />
            {renderMaterial()}
          </mesh>
        );
      case 'kidneys':
        return (
          <>
            <mesh position={[-0.4, 0, 0]} scale={[0.6, 1, 0.5]} rotation={[0, 0, 0.2]}>
              <sphereGeometry args={[0.5, 32, 24]} />
              {renderMaterial()}
            </mesh>
            <mesh position={[0.4, 0, 0]} scale={[0.6, 1, 0.5]} rotation={[0, 0, -0.2]}>
              <sphereGeometry args={[0.5, 32, 24]} />
              {renderMaterial()}
            </mesh>
          </>
        );
      case 'intestines':
        return (
          <mesh>
            <torusKnotGeometry args={[0.6, 0.2, 128, 16, 3, 5]} />
            {renderMaterial()}
          </mesh>
        );
      case 'eyes':
        return (
          <>
            <mesh position={[-0.3, 0, 0]}>
              <sphereGeometry args={[0.2, 32, 32]} />
              {renderMaterial()}
            </mesh>
            <mesh position={[0.3, 0, 0]}>
              <sphereGeometry args={[0.2, 32, 32]} />
              {renderMaterial()}
            </mesh>
          </>
        );
      default:
        const fallbackGeom = (() => {
          if (part.shape === 'sphere') return <sphereGeometry args={[1, 32, 32]} />;
          if (part.shape === 'cylinder') return <cylinderGeometry args={[1, 0.85, 2, 24]} />;
          if (part.shape === 'box') return <boxGeometry args={[2, 2, 2]} />;
          return <sphereGeometry args={[1, 32, 32]} />;
        })();
        return (
          <mesh>
            {fallbackGeom}
            {renderMaterial()}
          </mesh>
        );
    }
  };

  return (
    <group
      ref={groupRef}
      position={part.position}
      scale={part.scale}
      onClick={(e) => { e.stopPropagation(); onSelect(part.id); }}
      onPointerOver={(e) => { e.stopPropagation(); setLocalHover(true); onHover(part.id); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setLocalHover(false); onHover(null); document.body.style.cursor = 'default'; }}
    >
      {renderGeometry()}
    </group>
  );
};

export default BodyPart3D;
