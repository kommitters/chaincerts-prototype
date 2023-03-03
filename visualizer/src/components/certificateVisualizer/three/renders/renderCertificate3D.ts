import { TextureLoader, MeshPhongMaterial } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { loadMaterial } from '../system/loadMaterial';
import { ICertificate, IModelSettings } from '../../interfaces';

const DEFAULT_OBJECT_X_ROTATION = -0.12;
const DEFAULT_OBJECT_Y_ROTATION = 1.65;
const DEFAULT_POSITION_X_ROTATION = 0.3;
const DEFAULT_POSITION_Y_ROTATION = -2.4;
const KM_CETIFICATE_ASSETS_PATH = 'kommit-mentor-assets';

export const renderCertificate3D = async (certificate: ICertificate) => {
  const loader = new OBJLoader();
  const material = await loadMaterial(formatCertificateAssetPath(certificate.materialFile));
  loader.setMaterials(material);

  const certificate3D = loader.loadAsync(formatCertificateAssetPath(certificate.objectFile)).then((blenderObject) => {
    const textureLoader = new TextureLoader();

    certificate.modelSettings.forEach((mesh_data: IModelSettings) => {
      const mesh = blenderObject.children.find((mesh) => mesh.name === mesh_data.name)! as THREE.Mesh;
      mesh.visible = mesh_data.visible;
      const texture = textureLoader.load(formatCertificateAssetPath(mesh_data.texture));
      mesh.material = new MeshPhongMaterial({ map: texture });
    });

    blenderObject.rotation.x = DEFAULT_OBJECT_X_ROTATION;
    blenderObject.rotation.y = DEFAULT_OBJECT_Y_ROTATION;
    blenderObject.position.x = DEFAULT_POSITION_X_ROTATION;
    blenderObject.position.y = DEFAULT_POSITION_Y_ROTATION;

    return blenderObject;
  });

  return certificate3D;
};

const formatCertificateAssetPath = (file: string) => `./${KM_CETIFICATE_ASSETS_PATH}/${file}`;
