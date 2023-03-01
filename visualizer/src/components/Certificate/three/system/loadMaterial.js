import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

async function loadMaterial(router) {
  const loader = new MTLLoader();

  return loader.loadAsync(router);
}

export { loadMaterial };
