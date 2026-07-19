import { describe, expect, it } from 'vitest';
import { buildTerrainHeightField } from './terrainGeometry';

describe('buildTerrainHeightField', () => {
  it('produces one height per vertex on a (segments+1) x (segments+1) grid', () => {
    const heights = buildTerrainHeightField({
      width: 10,
      depth: 10,
      segments: 4,
      noise2D: () => 1,
    });
    expect(heights).toBeInstanceOf(Float32Array);
    expect(heights.length).toBe(5 * 5);
  });

  it('scales noise output by amplitude', () => {
    const heights = buildTerrainHeightField({
      width: 10,
      depth: 10,
      segments: 1,
      noise2D: () => 0.5,
      amplitude: 2,
    });
    for (const h of heights) {
      expect(h).toBeCloseTo(1);
    }
  });

  it('maps grid position to centered world coordinates before sampling noise', () => {
    const seen: Array<[number, number]> = [];
    buildTerrainHeightField({
      width: 10,
      depth: 10,
      segments: 1,
      frequency: 1,
      noise2D: (x, z) => {
        seen.push([x, z]);
        return 0;
      },
    });
    expect(seen).toEqual([
      [-5, -5],
      [5, -5],
      [-5, 5],
      [5, 5],
    ]);
  });
});
