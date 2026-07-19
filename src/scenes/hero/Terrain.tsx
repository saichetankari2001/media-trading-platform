import { useMemo } from 'react';
import * as THREE from 'three';
import { createTerrainNoise } from '../../lib/noise';
import { buildTerrainHeightField } from './terrainGeometry';

const WIDTH = 40;
const DEPTH = 40;
const SEGMENTS = 96;

export function Terrain() {
  const geometry = useMemo(() => {
    const noise2D = createTerrainNoise();
    const heights = buildTerrainHeightField({
      width: WIDTH,
      depth: DEPTH,
      segments: SEGMENTS,
      noise2D,
    });

    const geo = new THREE.PlaneGeometry(WIDTH, DEPTH, SEGMENTS, SEGMENTS);
    const position = geo.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(position.count * 3);
    const lavender = new THREE.Color('#c9a8e0');
    const mauve = new THREE.Color('#8a6fa8');
    const violet = new THREE.Color('#1a1330');

    for (let i = 0; i < position.count; i++) {
      const height = heights[i];
      position.setZ(i, height);

      const t = THREE.MathUtils.clamp((height + 1.2) / 2.4, 0, 1);
      const color = t < 0.5
        ? lavender.clone().lerp(mauve, t * 2)
        : mauve.clone().lerp(violet, (t - 0.5) * 2);
      color.toArray(colors, i * 3);
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshStandardMaterial vertexColors roughness={0.9} metalness={0.05} />
    </mesh>
  );
}
