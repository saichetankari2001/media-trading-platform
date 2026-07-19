import { describe, expect, it } from 'vitest';
import { flowerSwayAngle, hummingbirdRise } from './parallaxMapping';

describe('hummingbirdRise', () => {
  it('is zero at scroll progress 0', () => {
    expect(hummingbirdRise(0)).toBe(0);
  });

  it('reaches maxRise at scroll progress 1', () => {
    expect(hummingbirdRise(1, 3)).toBeCloseTo(3);
  });

  it('clamps progress outside [0, 1]', () => {
    expect(hummingbirdRise(-1)).toBe(0);
    expect(hummingbirdRise(2, 3)).toBeCloseTo(3);
  });
});

describe('flowerSwayAngle', () => {
  it('is zero at scroll progress 0 regardless of phase', () => {
    expect(flowerSwayAngle(0, 1.2)).toBe(0);
  });

  it('scales with amplitude', () => {
    const small = flowerSwayAngle(0.5, 0, 0.1);
    const large = flowerSwayAngle(0.5, 0, 0.5);
    expect(Math.abs(large)).toBeGreaterThan(Math.abs(small));
  });
});
