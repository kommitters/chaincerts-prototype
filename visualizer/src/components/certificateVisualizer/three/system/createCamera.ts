import { PerspectiveCamera } from 'three';

const FOV = 51;
const NEAR = 0.1;
const FAR = 70;

export const createCamera = (width: number, height: number) => {
  const aspectRatio = width / height;
  const camera = new PerspectiveCamera(FOV, aspectRatio, NEAR, FAR);

  return camera;
};
