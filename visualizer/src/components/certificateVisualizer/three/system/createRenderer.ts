import { WebGLRenderer } from 'three';

export const createRenderer = (container: HTMLElement) => {
  const renderer = new WebGLRenderer();

  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setPixelRatio(1.8);

  return renderer;
};
