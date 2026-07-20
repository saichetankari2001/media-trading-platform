import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';
import { Terrain } from './Terrain';
import { Flowers } from './Flowers';
import { Hummingbird } from './Hummingbird';
import { flowerSwayAngle, hummingbirdRise } from './parallaxMapping';

function SceneContents({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const hummingbirdGroup = useRef<THREE.Group>(null);
  const flowerGroup = useRef<THREE.Group>(null);

  useFrame(() => {
    const progress = scrollProgress.get();

    if (hummingbirdGroup.current) {
      hummingbirdGroup.current.position.y = 1.5 + hummingbirdRise(progress);
    }
    if (flowerGroup.current) {
      flowerGroup.current.rotation.z = flowerSwayAngle(progress, 0.4);
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} color="#8a6fa8" />
      <directionalLight position={[5, 8, 5]} intensity={0.6} color="#c9a8e0" />
      <fog attach="fog" args={['#1a1330', 15, 45]} />
      <Terrain />
      <group ref={flowerGroup}>
        <Flowers />
      </group>
      <group ref={hummingbirdGroup} position={[0, 1.5, 2]}>
        <Hummingbird position={[0, 0, 0]} />
      </group>
    </>
  );
}

export function HeroScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 10], fov: 45 }}
      gl={{ antialias: true }}
      className="!absolute inset-0"
    >
      <color attach="background" args={['#1a1330']} />
      <SceneContents scrollProgress={scrollProgress} />
    </Canvas>
  );
}
