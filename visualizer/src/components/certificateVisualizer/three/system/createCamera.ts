import { PerspectiveCamera } from 'three';
import {
  DEFAULT_CAMERA_Z_POSITION_LARGE_SCREEN,
  DEFAULT_CAMERA_Z_POSITION_SMALL_SCREEN,
  SMALL_WIDHT
} from '../../../../utils/constants';

const FOV = 51;
const NEAR = 0.1;
const FAR = 70;

const DEFAULT_CAMERA_X_POSITION = -0.3;

export const createCamera = (width: number, height: number) => {
  const aspectRatio = width / height;
  const camera = new PerspectiveCamera(FOV, aspectRatio, NEAR, FAR);
  const positionZ =
    width > SMALL_WIDHT ? DEFAULT_CAMERA_Z_POSITION_LARGE_SCREEN : DEFAULT_CAMERA_Z_POSITION_SMALL_SCREEN;

  camera.position.z = positionZ;
  camera.position.x = DEFAULT_CAMERA_X_POSITION;

  return camera;
};
