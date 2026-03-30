import { useRef, useState } from 'react';
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

const BodyPart3D = ({ part, isSelected, isFiltered, onSelect, onHover, isHovered }: BodyPart3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [localHover, setLocalHover] = useState(false);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;

    const targetEmissive = isSelected ? 0.6 : (localHover || isHovered) ? 0.3 : 0;
    mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetEmissive, delta * 8);

    const targetOpacity = isFiltered ? 0.9 : 0.1;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, delta * 6);
  });

  const geometry = (() => {
    switch (part.shape) {
      case 'sphere': return <sphereGeometry args={[1, 24, 24]} />;
      case 'cylinder': return <cylinderGeometry args={[1, 0.9, 2, 16]} />;
      case 'box': return <boxGeometry args={[2, 2, 2]} />;
      default: return <sphereGeometry args={[1, 24, 24]} />;
    }
  })();

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
      <meshStandardMaterial
        color={part.color}
        emissive={part.color}
        emissiveIntensity={0}
        transparent
        opacity={0.9}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
};

export default BodyPart3D;
