import { PerspectiveCamera } from 'three';

const ASPECT_RATIO = 1.24;
const FOV = 51;
const NEAR = 0.1;
const FAR = 70;

export const createCamera = () => {
  const camera = new PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);

  camera.position.z = -6.5;
  camera.position.x = -0.3;

  return camera;
};
