import { WebGLRenderer } from 'three';

function createRenderer(container) {
  const renderer = new WebGLRenderer();

  renderer.setSize(container.offsetWidth, container.offsetHeight);

  return renderer;
}

export { createRenderer };
