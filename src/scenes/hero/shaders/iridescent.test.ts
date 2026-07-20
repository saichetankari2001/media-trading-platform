import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { createIridescentMaterial, setGlowStrength } from './iridescent';

describe('createIridescentMaterial', () => {
  it('configures iridescence on a MeshPhysicalMaterial', () => {
    const material = createIridescentMaterial({ baseColor: '#ff00ff' });
    expect(material).toBeInstanceOf(THREE.MeshPhysicalMaterial);
    expect(material.iridescence).toBe(1);
    expect(material.color.getHexString()).toBe('ff00ff');
  });

  it('injects a fresnel-driven glow uniform into the fragment shader', () => {
    const material = createIridescentMaterial({ glowColor: '#7fd8d0', glowStrength: 1.4 });
    const fakeShader = {
      uniforms: {} as Record<string, { value: unknown }>,
      fragmentShader: '#include <common>\nvoid main() {\n#include <dithering_fragment>\n}',
    } as unknown as THREE.WebGLProgramParametersWithUniforms;

    material.onBeforeCompile(fakeShader, {} as THREE.WebGLRenderer);

    expect(fakeShader.uniforms.uGlowColor.value).toBeInstanceOf(THREE.Color);
    expect(fakeShader.uniforms.uGlowStrength.value).toBe(1.4);
    expect(fakeShader.fragmentShader).toContain('fresnelTerm');
  });

  it('setGlowStrength updates the compiled shader uniform', () => {
    const material = createIridescentMaterial();
    const fakeShader = {
      uniforms: {} as Record<string, { value: unknown }>,
      fragmentShader: '#include <common>\nvoid main() {\n#include <dithering_fragment>\n}',
    } as unknown as THREE.WebGLProgramParametersWithUniforms;

    material.onBeforeCompile(fakeShader, {} as THREE.WebGLRenderer);
    setGlowStrength(material, 2.5);

    expect(fakeShader.uniforms.uGlowStrength.value).toBe(2.5);
  });
});
