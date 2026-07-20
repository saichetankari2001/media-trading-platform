import { useMemo } from 'react';
import * as THREE from 'three';

function createRoughnessMap(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(size, size);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const value = 80 + Math.random() * 100;
    imageData.data[i] = value;
    imageData.data[i + 1] = value;
    imageData.data[i + 2] = value;
    imageData.data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function buildPetalGeometry(): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.4, 0.3),
    new THREE.Vector2(0.9, 0.9),
    new THREE.Vector2(0.6, 1.6),
    new THREE.Vector2(0.15, 2.1),
    new THREE.Vector2(0, 2.2),
  ];
  return new THREE.LatheGeometry(points, 32, 0, Math.PI * 1.4);
}

interface BloomConfig {
  position: [number, number, number];
  scale: number;
  rotationY: number;
}

const BLOOMS: BloomConfig[] = [
  { position: [6, 0, -2], scale: 1.4, rotationY: 0.3 },
  { position: [8.5, 0, -4.5], scale: 1, rotationY: -0.6 },
  { position: [5.5, 0, -6], scale: 0.8, rotationY: 1.1 },
];

export function Flowers() {
  const geometry = useMemo(() => buildPetalGeometry(), []);
  const roughnessMap = useMemo(() => createRoughnessMap(), []);

  return (
    <group>
      {BLOOMS.map((bloom, i) => (
        <mesh
          key={i}
          geometry={geometry}
          position={bloom.position}
          rotation={[0, bloom.rotationY, 0]}
          scale={bloom.scale}
        >
          <meshPhysicalMaterial
            color="#f8f3e9"
            roughness={0.15}
            roughnessMap={roughnessMap}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            transmission={0.05}
            sheen={0.4}
            sheenColor="#c9a8e0"
          />
        </mesh>
      ))}
    </group>
  );
}
