import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import BodyPart3D from './BodyPart3D';
import { bodyPartsData } from '@/data/bodyParts';

interface HumanBodySceneProps {
  selectedPart: string | null;
  hoveredPart: string | null;
  activeSystem: string;
  onSelectPart: (id: string) => void;
  onHoverPart: (id: string | null) => void;
}

// Animated particle field for atmosphere
const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00d4aa"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

// Slow rotating light for dynamic shadows
const AnimatedLights = () => {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const t = state.clock.elapsedTime;
    lightRef.current.position.x = Math.sin(t * 0.3) * 4;
    lightRef.current.position.z = Math.cos(t * 0.3) * 4;
    lightRef.current.intensity = 0.4 + Math.sin(t * 0.8) * 0.15;
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 8, 5]} intensity={0.7} color="#c0e8ff" castShadow />
      <directionalLight position={[-4, 3, -5]} intensity={0.3} color="#4080c0" />
      <pointLight ref={lightRef} position={[0, 2, 3]} intensity={0.5} color="#00d4aa" distance={12} />
      <pointLight position={[0, -1, 2]} intensity={0.2} color="#ff6b6b" distance={8} />
      <spotLight position={[0, 6, 0]} angle={0.4} penumbra={0.8} intensity={0.3} color="#a0c4ff" />
    </>
  );
};

const HumanBodyScene = ({ selectedPart, hoveredPart, activeSystem, onSelectPart, onHoverPart }: HumanBodySceneProps) => {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 6], fov: 45 }}
      style={{ background: 'transparent' }}
      onPointerMissed={() => onSelectPart('')}
      shadows
    >
      <AnimatedLights />
      <ParticleField />

      <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.15} floatingRange={[-0.05, 0.05]}>
        <group>
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
        </group>
      </Float>

      <ContactShadows position={[0, -1.7, 0]} opacity={0.5} scale={12} blur={2.5} far={4} />
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={12}
        minPolarAngle={Math.PI * 0.1}
        maxPolarAngle={Math.PI * 0.85}
        target={[0, 1.2, 0]}
        autoRotate
        autoRotateSpeed={0.4}
        enableDamping
        dampingFactor={0.05}
      />
      <Environment preset="city" />
      <fog attach="fog" args={['#0a1020', 8, 20]} />

      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.85} 
          luminanceSmoothing={0.1}
          mipmapBlur 
          intensity={1.8} 
        />
      </EffectComposer>
    </Canvas>
  );
};

export default HumanBodyScene;
