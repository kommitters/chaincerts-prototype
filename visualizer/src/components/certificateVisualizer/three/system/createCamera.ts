import { PerspectiveCamera } from 'three';

const FOV = 51;
const NEAR = 0.1;
const FAR = 70;

const DEFAULT_CAMERA_Z_POSITION = -5.3;
const DEFAULT_CAMERA_X_POSITION = -0.3;

export const createCamera = (aspectRatio: number) => {
  const camera = new PerspectiveCamera(FOV, aspectRatio, NEAR, FAR);

  camera.position.z = DEFAULT_CAMERA_Z_POSITION;
  camera.position.x = DEFAULT_CAMERA_X_POSITION;

  return camera;
};
