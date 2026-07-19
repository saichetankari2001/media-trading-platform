export interface TerrainHeightFieldParams {
  width: number;
  depth: number;
  segments: number;
  noise2D: (x: number, y: number) => number;
  frequency?: number;
  amplitude?: number;
}

export function buildTerrainHeightField(params: TerrainHeightFieldParams): Float32Array {
  const { width, depth, segments, noise2D, frequency = 0.15, amplitude = 1.2 } = params;
  const verticesPerRow = segments + 1;
  const heights = new Float32Array(verticesPerRow * verticesPerRow);

  for (let row = 0; row <= segments; row++) {
    for (let col = 0; col <= segments; col++) {
      const x = (col / segments - 0.5) * width;
      const z = (row / segments - 0.5) * depth;
      const index = row * verticesPerRow + col;
      heights[index] = noise2D(x * frequency, z * frequency) * amplitude;
    }
  }

  return heights;
}
