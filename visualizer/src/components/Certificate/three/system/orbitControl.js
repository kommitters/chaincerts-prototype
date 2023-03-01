import { OrbitControls as OrbitC } from 'three/examples/jsm/controls/OrbitControls.js';

export const createOrbitControl = (camera, domElement) => {
  const controls = new OrbitC(camera, domElement);

  controls.maxDistance = 20;
  controls.minDistance = 1;
  controls.enablePan = false; // disable right click

  controls.tick = () => controls.update();

  return controls;
};
