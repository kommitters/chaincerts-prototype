import { WebGLRenderer } from 'three';

export const createRenderer = (container: HTMLElement) => {
  const renderer = new WebGLRenderer();

  renderer.setSize(container.offsetWidth, container.offsetHeight);

  return renderer;
};
