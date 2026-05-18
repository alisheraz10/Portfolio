import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Cylinder, GradientTexture } from '@react-three/drei';
import type { Theme } from '../../types';
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}

const Avatar = ({ theme }: { theme: Theme }) => {
  const headRef    = useRef<THREE.Group>(null);
  const groupRef   = useRef<THREE.Group>(null);
  const antennaRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (headRef.current && groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
      const x = state.pointer.x;
      const y = state.pointer.y;
      headRef.current.rotation.y += (x * 0.8 - headRef.current.rotation.y) * 0.1;
      headRef.current.rotation.x += (-y * 0.5 - headRef.current.rotation.x) * 0.1;
    }
    if (antennaRef.current) {
      antennaRef.current.emissiveIntensity = 1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.5;
    }
  });

  // Updated brand gradient colors
  const gradientColors = useMemo(
    () => (theme === 'dark' ? ['#8B5CF6', '#06B6D4'] : ['#7C3AED', '#0891B2']) as [string, string],
    [theme],
  );

  const skinColor    = '#94a3b8';
  const eyeColor     = '#0f172a';
  const primaryColor = '#8B5CF6';

  return (
    <group ref={groupRef} scale={1.4}>
      <group position={[0, -1.2, 0]}>
        <Box args={[1.4, 1.2, 0.8]} position={[0, 0.6, 0]}>
          <meshStandardMaterial roughness={0.3}>
            <GradientTexture stops={[0, 1]} colors={gradientColors} size={1024} />
          </meshStandardMaterial>
        </Box>
        <Cylinder args={[0.2, 0.2, 0.5, 16]} position={[0, 1.3, 0]}>
          <meshStandardMaterial color="#475569" />
        </Cylinder>
      </group>

      <group ref={headRef} position={[0, 0.4, 0]}>
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial color={skinColor} roughness={0.2} />
        </Box>
        <Cylinder args={[0.05, 0.05, 0.5]} position={[0, 0.75, 0]}>
          <meshStandardMaterial color="#475569" />
        </Cylinder>
        <Sphere args={[0.15, 16, 16]} position={[0, 1, 0]}>
          <meshStandardMaterial
            ref={antennaRef}
            color={primaryColor}
            emissive={primaryColor}
            emissiveIntensity={1}
            toneMapped={false}
          />
        </Sphere>

        <group position={[0, 0.1, 0.51]}>
          <Box args={[0.25, 0.15, 0.05]} position={[-0.25, 0, 0]}>
            <meshStandardMaterial color={eyeColor} />
          </Box>
          <Box args={[0.25, 0.15, 0.05]} position={[0.25, 0, 0]}>
            <meshStandardMaterial color={eyeColor} />
          </Box>
        </group>

        <Box args={[0.3, 0.05, 0.05]} position={[0, -0.25, 0.51]}>
          <meshStandardMaterial color={eyeColor} />
        </Box>

        {/* Headphone ears with brand gradient */}
        <Box args={[0.2, 0.6, 0.4]} position={[-0.6, 0, 0]}>
          <meshStandardMaterial roughness={0.4}>
            <GradientTexture stops={[0, 1]} colors={gradientColors} size={1024} />
          </meshStandardMaterial>
        </Box>
        <Box args={[0.2, 0.6, 0.4]} position={[0.6, 0, 0]}>
          <meshStandardMaterial roughness={0.4}>
            <GradientTexture stops={[0, 1]} colors={gradientColors} size={1024} />
          </meshStandardMaterial>
        </Box>
      </group>
    </group>
  );
};

const AboutObject: React.FC<{ theme: Theme }> = ({ theme }) => (
  <Canvas camera={{ position: [0, 0, 5] }}>
    <ambientLight intensity={0.7} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} color="#8B5CF6" />
    <pointLight position={[-10, -10, -10]} intensity={0.6} color="#06B6D4" />
    <Avatar theme={theme} />
  </Canvas>
);

export default AboutObject;
