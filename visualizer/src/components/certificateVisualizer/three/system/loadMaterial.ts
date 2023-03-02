import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export const loadMaterial = async (router: string) => {
  const loader = new MTLLoader();

  return loader.loadAsync(router);
};
