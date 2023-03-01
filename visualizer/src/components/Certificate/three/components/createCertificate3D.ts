import { TextureLoader, MeshPhongMaterial } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { loadMaterial } from '../system/loadMaterial';
import { Certificate, ModelSettings } from '../../interfaces';

export const createCertificate3D = async (certificate: Certificate) => {
  const loader = new OBJLoader();
  const material = await loadMaterial(`./assets/${certificate.material_file}`);
  loader.setMaterials(material);

  const certificate3D = loader.loadAsync(`/assets/${certificate.object_file}`).then((blenderObject) => {
    const textureLoader = new TextureLoader();

    certificate.model_settings.forEach((mesh_data: ModelSettings) => {
      const mesh = blenderObject.children.find((mesh) => mesh.name === mesh_data.name)! as THREE.Mesh;
      mesh.visible = mesh_data.visible;
      const texture = textureLoader.load(`./assets/${mesh_data.texture}`);
      mesh.material = new MeshPhongMaterial({ map: texture });
    });

    blenderObject.rotation.x = -0.12;
    blenderObject.rotation.y = 1.65;

    blenderObject.position.y = -2.4;
    blenderObject.position.x = 0.3;

    return blenderObject;
  });

  return certificate3D;
};
