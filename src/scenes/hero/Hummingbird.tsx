import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { createIridescentMaterial } from './shaders/iridescent';

const MODEL_PATH = '/models/hummingbird.glb';

export function Hummingbird({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);
  const material = useRef(createIridescentMaterial()).current;

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = material;
    }
  });

  useFrame((state) => {
    if (!group.current) return;
    const wingBeat = Math.sin(state.clock.elapsedTime * 18) * 0.1;
    group.current.rotation.z = wingBeat;
  });

  return (
    <group ref={group} position={position}>
      <primitive object={scene} scale={0.4} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
