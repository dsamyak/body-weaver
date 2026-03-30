import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
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
  if (['ribcage', 'lungs', 'heart', 'stomach', 'liver'].includes(id))
    return { breathe: 0.03, pulse: id === 'heart' ? 0.06 : 0, speed: id === 'heart' ? 4.5 : 1.2 };
  if (['skull', 'brain', 'eyes', 'neck'].includes(id))
    return { breathe: 0.008, pulse: 0, speed: 0.8, bobY: 0.008 };
  if (id.includes('arm') || id.includes('hand') || id.includes('shoulder') || id.includes('leg') || id.includes('foot'))
    return { breathe: 0, pulse: 0, speed: 1, sway: 0.012 };
  return { breathe: 0.005, pulse: 0, speed: 1 };
};

const BodyPart3D = ({ part, isSelected, isFiltered, onSelect, onHover, isHovered }: BodyPart3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [localHover, setLocalHover] = useState(false);
  const animConfig = useMemo(() => getAnimConfig(part.id), [part.id]);
  const basePos = useMemo(() => new THREE.Vector3(...part.position), [part.position]);
  const baseScale = useMemo(() => new THREE.Vector3(...part.scale), [part.scale]);
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  const isOrgan = ['brain', 'heart', 'lungs', 'stomach', 'liver', 'kidneys', 'intestines', 'eyes'].includes(part.id);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime + timeOffset;

    const targetEmissive = isSelected ? 0.8 : (localHover || isHovered) ? 0.4 : 0.05;
    const targetOpacity = isFiltered ? 0.92 : 0.08;

    groupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          if ('emissiveIntensity' in mesh.material) {
             (mesh.material as any).emissiveIntensity = THREE.MathUtils.lerp((mesh.material as any).emissiveIntensity, targetEmissive, delta * 8);
          }
          if ('opacity' in mesh.material) {
             (mesh.material as any).opacity = THREE.MathUtils.lerp((mesh.material as any).opacity, targetOpacity, delta * 6);
          }
        }
      }
    });

    const breatheFactor = 1 + Math.sin(t * animConfig.speed) * animConfig.breathe;
    const pulseFactor = animConfig.pulse ? 1 + Math.sin(t * animConfig.speed) * animConfig.pulse : 1;
    groupRef.current.scale.set(
      baseScale.x * breatheFactor * pulseFactor,
      baseScale.y * breatheFactor,
      baseScale.z * breatheFactor * pulseFactor
    );

    const bobY = animConfig.bobY ? Math.sin(t * 0.8) * animConfig.bobY : 0;
    const sway = animConfig.sway ? Math.sin(t * 0.6) * animConfig.sway : 0;
    groupRef.current.position.set(
      basePos.x + sway,
      basePos.y + bobY,
      basePos.z
    );
  });

  const renderMaterial = () => {
    if (part.id === 'brain') {
      return (
        <MeshDistortMaterial
          color={part.color}
          emissive={part.color}
          emissiveIntensity={0.05}
          transparent
          opacity={0.92}
          roughness={0.6}
          metalness={0.1}
          distort={0.4}
          speed={1.5}
        />
      );
    }
    return (
      <meshPhysicalMaterial
        color={part.color}
        emissive={part.color}
        emissiveIntensity={0.05}
        transparent
        opacity={0.92}
        roughness={isOrgan ? 0.5 : 0.35}
        metalness={isOrgan ? 0.1 : 0.2}
        clearcoat={isOrgan ? 0.8 : 0.3}
        clearcoatRoughness={0.2}
        transmission={isOrgan ? 0.2 : 0}
        thickness={isOrgan ? 0.5 : 0}
        ior={1.4}
        sheen={isOrgan ? 0.5 : 0}
        sheenColor={new THREE.Color(part.color).multiplyScalar(1.5)}
        sheenRoughness={0.3}
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
        return (
          <>
            {[...Array(6)].map((_, i) => (
              <mesh key={`rib-l-${i}`} position={[-0.5, 0.8 - i * 0.3, 0]} rotation={[0, 0, -0.2 - i * 0.05]}>
                <torusGeometry args={[0.6 - i * 0.05, 0.08, 16, 32, Math.PI * 0.7]} />
                {renderMaterial()}
              </mesh>
            ))}
            {[...Array(6)].map((_, i) => (
              <mesh key={`rib-r-${i}`} position={[0.5, 0.8 - i * 0.3, 0]} rotation={[0, 0, 0.2 + i * 0.05]} scale={[-1, 1, 1]}>
                <torusGeometry args={[0.6 - i * 0.05, 0.08, 16, 32, Math.PI * 0.7]} />
                {renderMaterial()}
              </mesh>
            ))}
            <mesh position={[0, 0.1, 0.5]}>
              <boxGeometry args={[0.2, 1.8, 0.1]} />
              {renderMaterial()}
            </mesh>
          </>
        );
      case 'spine':
        return (
          <>
            {[...Array(10)].map((_, i) => (
              <group key={`vert-${i}`} position={[0, 1.5 - i * 0.35, -0.2]}>
                <mesh>
                  <boxGeometry args={[0.4, 0.2, 0.4]} />
                  {renderMaterial()}
                </mesh>
                <mesh position={[0, -0.15, 0]}>
                  <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
                  <meshPhysicalMaterial color="#a0c4ff" transparent opacity={0.6} roughness={0.2} transmission={0.8} />
                </mesh>
              </group>
            ))}
          </>
        );
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
