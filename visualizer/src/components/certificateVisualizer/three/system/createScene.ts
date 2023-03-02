import { AmbientLight, Scene } from 'three';

export const createScene = () => {
  const scene = new Scene();
  const light = new AmbientLight();

  scene.add(light);

  return scene;
};
