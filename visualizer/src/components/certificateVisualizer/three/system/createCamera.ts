import { PerspectiveCamera } from 'three';

const ASPECT_RATIO = 1.24;
const FOV = 51;
const NEAR = 0.1;
const FAR = 70;

const DEFAULT_CAMERA_Z_POSITION = -6.5;
const DEFAULT_CAMERA_X_POSITION = -0.3;

export const createCamera = () => {
  const camera = new PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);

  camera.position.z = DEFAULT_CAMERA_Z_POSITION;
  camera.position.x = DEFAULT_CAMERA_X_POSITION;

  return camera;
};
