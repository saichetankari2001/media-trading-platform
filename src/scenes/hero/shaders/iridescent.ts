import * as THREE from 'three';

export interface IridescentMaterialOptions {
  baseColor?: THREE.ColorRepresentation;
  glowColor?: THREE.ColorRepresentation;
  glowStrength?: number;
}

export function createIridescentMaterial(
  options: IridescentMaterialOptions = {}
): THREE.MeshPhysicalMaterial {
  const { baseColor = '#d8b4fe', glowColor = '#7fd8d0', glowStrength = 1.4 } = options;

  const material = new THREE.MeshPhysicalMaterial({
    color: baseColor,
    metalness: 0.2,
    roughness: 0.25,
    iridescence: 1,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [100, 400],
    clearcoat: 0.6,
  });

  const glow = new THREE.Color(glowColor);

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uGlowColor = { value: glow };
    shader.uniforms.uGlowStrength = { value: glowStrength };

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform vec3 uGlowColor;
        uniform float uGlowStrength;`
      )
      .replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>
        float fresnelTerm = pow(1.0 - saturate(dot(normalize(vNormal), normalize(vViewPosition))), 3.0);
        gl_FragColor.rgb += uGlowColor * fresnelTerm * uGlowStrength;`
      );

    material.userData.shader = shader;
  };

  return material;
}

export function setGlowStrength(material: THREE.MeshPhysicalMaterial, strength: number): void {
  const shader = material.userData.shader as THREE.WebGLProgramParametersWithUniforms | undefined;
  if (shader) {
    shader.uniforms.uGlowStrength.value = strength;
  }
}
