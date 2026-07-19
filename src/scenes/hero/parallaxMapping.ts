function clampUnit(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function hummingbirdRise(progress: number, maxRise = 2.5): number {
  const clamped = clampUnit(progress);
  return easeOutCubic(clamped) * maxRise;
}

export function flowerSwayAngle(progress: number, phaseOffset: number, amplitude = 0.15): number {
  const clamped = clampUnit(progress);
  return Math.sin(clamped * Math.PI * 2 + phaseOffset) * amplitude * clamped;
}
