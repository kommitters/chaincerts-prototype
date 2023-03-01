import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export const loadMaterial = async (router) => {
  const loader = new MTLLoader();

  return loader.loadAsync(router);
};
