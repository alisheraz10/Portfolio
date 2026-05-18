import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Instances, Instance, Float } from '@react-three/drei';
import type { Theme } from '../../types';
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
    }
  }
}

const Particles = () => {
  const ref = useRef<THREE.Group>(null);
  const color1 = useMemo(() => new THREE.Color('#8B5CF6'), []);
  const color2 = useMemo(() => new THREE.Color('#06B6D4'), []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.08;
      ref.current.rotation.z = state.clock.getElapsedTime() * 0.04;
      const x = state.pointer.x * 0.6;
      const y = state.pointer.y * 0.6;
      ref.current.rotation.x += (y - ref.current.rotation.x) * 0.02;
      ref.current.rotation.y += (x - ref.current.rotation.y) * 0.02;
    }
  });

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
        ] as [number, number, number],
        speed: Math.random() * 0.2 + 0.05,
        scale: Math.random() * 0.6 + 0.2,
      });
    }
    return temp;
  }, []);

  return (
    <group ref={ref}>
      <Instances range={50}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial />
        {particles.map((data, i) => (
          <Particle key={i} {...data} color={i % 2 === 0 ? color1 : color2} />
        ))}
      </Instances>
    </group>
  );
};

const Particle = ({
  position, speed, scale, color,
}: {
  position: [number, number, number];
  speed: number;
  scale: number;
  color: THREE.Color;
}) => {
  const ref = useRef<any>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y += Math.sin(t * speed + position[0]) * 0.015;
      ref.current.rotation.x = t * speed;
      ref.current.rotation.z = t * speed * 0.5;
    }
  });
  return <Instance ref={ref} position={position} scale={scale} color={color} />;
};

const HeroScene: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-slate-900/20 rounded-3xl border border-primary/10">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      }>
        <Canvas 
          className="w-full h-full" 
          camera={{ position: [0, 0, 12], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={theme === 'dark' ? 0.6 : 0.9} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#8B5CF6" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#06B6D4" />
          <pointLight position={[0, 0, 5]} intensity={1} color="#ffffff" />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Particles />
          </Float>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default HeroScene;
