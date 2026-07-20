import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createIridescentMaterial } from './shaders/iridescent';

export function Hummingbird({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  const leftWing = useRef<THREE.Mesh>(null);
  const rightWing = useRef<THREE.Mesh>(null);
  const material = useRef(createIridescentMaterial()).current;

  const bodyGeometry = useMemo(() => {
    const points = [
      new THREE.Vector2(0, -0.5),
      new THREE.Vector2(0.18, -0.3),
      new THREE.Vector2(0.22, 0.1),
      new THREE.Vector2(0.1, 0.45),
      new THREE.Vector2(0, 0.55),
    ];
    return new THREE.LatheGeometry(points, 24);
  }, []);

  const wingGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.6, 0.15, 0.75, -0.05);
    shape.quadraticCurveTo(0.5, -0.25, 0, 0);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.02, bevelEnabled: false });
  }, []);

  useFrame((state) => {
    const beat = Math.sin(state.clock.elapsedTime * 22) * 0.9;
    if (leftWing.current) leftWing.current.rotation.z = beat;
    if (rightWing.current) rightWing.current.rotation.z = -beat;
  });

  return (
    <group ref={group} position={position}>
      <mesh geometry={bodyGeometry} material={material} />
      <mesh ref={leftWing} geometry={wingGeometry} material={material} position={[0.05, 0.1, 0]} />
      <mesh
        ref={rightWing}
        geometry={wingGeometry}
        material={material}
        position={[-0.05, 0.1, 0]}
        scale={[-1, 1, 1]}
      />
    </group>
  );
}
