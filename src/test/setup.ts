import '@testing-library/jest-dom/vitest';

// jsdom does not implement ResizeObserver. @react-three/fiber's <Canvas>
// (via react-use-measure) requires it to be present at render time, which
// only surfaces once a test renders the hero scene (Task 13's App tree).
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver;
}
