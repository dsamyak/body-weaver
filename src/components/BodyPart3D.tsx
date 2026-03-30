import { useRef, useState, useMemo } from 'react';
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

// Breathing/idle animation config per body region
const getAnimConfig = (id: string) => {
  // Torso parts breathe
  if (['ribcage', 'lungs', 'heart', 'stomach', 'liver'].includes(id))
    return { breathe: 0.03, pulse: id === 'heart' ? 0.06 : 0, speed: id === 'heart' ? 4.5 : 1.2 };
  // Head bobs gently
  if (['skull', 'brain', 'eyes', 'neck'].includes(id))
    return { breathe: 0.008, pulse: 0, speed: 0.8, bobY: 0.008 };
  // Arms/hands sway
  if (id.includes('arm') || id.includes('hand') || id.includes('shoulder'))
    return { breathe: 0, pulse: 0, speed: 1, sway: 0.012 };
  // Legs subtle
  return { breathe: 0.005, pulse: 0, speed: 1 };
};

const BodyPart3D = ({ part, isSelected, isFiltered, onSelect, onHover, isHovered }: BodyPart3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [localHover, setLocalHover] = useState(false);
  const animConfig = useMemo(() => getAnimConfig(part.id), [part.id]);
  const basePos = useMemo(() => new THREE.Vector3(...part.position), [part.position]);
  const baseScale = useMemo(() => new THREE.Vector3(...part.scale), [part.scale]);
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
    const t = state.clock.elapsedTime + timeOffset;

    // Emissive glow
    const targetEmissive = isSelected ? 0.8 : (localHover || isHovered) ? 0.4 : 0.05;
    mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetEmissive, delta * 8);

    // Opacity
    const targetOpacity = isFiltered ? 0.92 : 0.08;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, delta * 6);

    // Breathing scale animation
    const breatheFactor = 1 + Math.sin(t * animConfig.speed) * animConfig.breathe;
    const pulseFactor = animConfig.pulse ? 1 + Math.sin(t * animConfig.speed) * animConfig.pulse : 1;
    meshRef.current.scale.set(
      baseScale.x * breatheFactor * pulseFactor,
      baseScale.y * breatheFactor,
      baseScale.z * breatheFactor * pulseFactor
    );

    // Subtle position animation (bob / sway)
    const bobY = animConfig.bobY ? Math.sin(t * 0.8) * animConfig.bobY : 0;
    const sway = animConfig.sway ? Math.sin(t * 0.6) * animConfig.sway : 0;
    meshRef.current.position.set(
      basePos.x + sway,
      basePos.y + bobY,
      basePos.z
    );
  });

  const geometry = (() => {
    switch (part.shape) {
      case 'sphere': return <sphereGeometry args={[1, 32, 32]} />;
      case 'cylinder': return <cylinderGeometry args={[1, 0.85, 2, 24]} />;
      case 'box': return <boxGeometry args={[2, 2, 2]} />;
      default: return <sphereGeometry args={[1, 32, 32]} />;
    }
  })();

  // Determine if this is an "organ" (internal) or structural part
  const isOrgan = ['brain', 'heart', 'lungs', 'stomach', 'liver', 'kidneys', 'intestines', 'eyes'].includes(part.id);

  return (
    <mesh
      ref={meshRef}
      position={part.position}
      scale={part.scale}
      onClick={(e) => { e.stopPropagation(); onSelect(part.id); }}
      onPointerOver={(e) => { e.stopPropagation(); setLocalHover(true); onHover(part.id); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setLocalHover(false); onHover(null); document.body.style.cursor = 'default'; }}
    >
      {geometry}
      <meshPhysicalMaterial
        color={part.color}
        emissive={part.color}
        emissiveIntensity={0.05}
        transparent
        opacity={0.92}
        roughness={isOrgan ? 0.6 : 0.35}
        metalness={isOrgan ? 0.05 : 0.15}
        clearcoat={isOrgan ? 0.8 : 0.3}
        clearcoatRoughness={0.2}
        transmission={isOrgan ? 0.15 : 0}
        thickness={isOrgan ? 0.5 : 0}
        ior={1.4}
        sheen={isOrgan ? 0.5 : 0}
        sheenColor={new THREE.Color(part.color).multiplyScalar(1.5)}
        sheenRoughness={0.3}
      />
    </mesh>
  );
};

export default BodyPart3D;
