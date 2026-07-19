import { createNoise2D, type NoiseFunction2D } from 'simplex-noise';

export function createTerrainNoise(seed?: () => number): NoiseFunction2D {
  return createNoise2D(seed);
}
