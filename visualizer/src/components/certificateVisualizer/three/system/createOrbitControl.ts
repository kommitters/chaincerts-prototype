import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const createOrbitControl = (camera: PerspectiveCamera, domElement: HTMLElement) => {
  const controls = new OrbitControls(camera, domElement);

  controls.maxDistance = 20;
  controls.minDistance = 1;
  controls.enablePan = false; // disable right click

  return controls;
};
