import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import BodyPart3D from './BodyPart3D';
import { bodyPartsData } from '@/data/bodyParts';

interface HumanBodySceneProps {
  selectedPart: string | null;
  hoveredPart: string | null;
  activeSystem: string;
  onSelectPart: (id: string) => void;
  onHoverPart: (id: string | null) => void;
}

const HumanBodyScene = ({ selectedPart, hoveredPart, activeSystem, onSelectPart, onHoverPart }: HumanBodySceneProps) => {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 6], fov: 45 }}
      style={{ background: 'transparent' }}
      onClick={() => onSelectPart('')}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#a0e0ff" />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#4080c0" />
      <pointLight position={[0, 2, 3]} intensity={0.5} color="#00d4aa" distance={10} />

      {bodyPartsData.map((part) => (
        <BodyPart3D
          key={part.id}
          part={part}
          isSelected={selectedPart === part.id}
          isFiltered={activeSystem === 'all' || part.system.includes(activeSystem)}
          onSelect={onSelectPart}
          onHover={onHoverPart}
          isHovered={hoveredPart === part.id}
        />
      ))}

      <ContactShadows position={[0, -1.7, 0]} opacity={0.4} scale={10} blur={2} />
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={12}
        minPolarAngle={Math.PI * 0.1}
        maxPolarAngle={Math.PI * 0.85}
        target={[0, 1.2, 0]}
      />
      <Environment preset="city" />
    </Canvas>
  );
};

export default HumanBodyScene;
