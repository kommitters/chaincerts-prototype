import { AmbientLight, Scene } from 'three';

export const createScene = () => {
  const scene = new Scene();
  const light = new AmbientLight();

  light.intensity = 1.5;
  scene.add(light);

  return scene;
};
