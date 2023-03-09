import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const DEFAULT_CAMERA_MAX_DISTANCE = 20;
const DEFAULT_CAMERA_MIN_DISTANCE = 1;
const DEFAULT_CAMERA_ROTATION_SPEED = 5;

export const createOrbitControl = (camera: PerspectiveCamera, domElement: HTMLElement) => {
  const controls = new OrbitControls(camera, domElement);

  controls.maxDistance = DEFAULT_CAMERA_MAX_DISTANCE;
  controls.minDistance = DEFAULT_CAMERA_MIN_DISTANCE;
  controls.autoRotate = true;
  controls.autoRotateSpeed = DEFAULT_CAMERA_ROTATION_SPEED;
  controls.enablePan = false; // disable right click

  return controls;
};
