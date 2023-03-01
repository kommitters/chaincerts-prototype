import { MeshMatcapMaterial, Mesh, Scene } from 'three';
import { FontLoader, TextGeometry } from '../system';
import { TextSettings } from '../../interfaces';

const loader = new FontLoader();

const FONT_WEIGHT_BOLD = 1.1;
const FONT_WEIGHT_NORMAL = 1;
const NORMAL_Y_TEXT_ROTATION = 3.2;
const VERTICAL_Y_TEXT_ROTATION = 1.5;
const VERTICAL_Z_TEXT_ROTATION = 1.57;

export const createText = async (
  scene: Scene,
  { text, fontSize, position, color = '0xffffff', vertical = false, bold = false }: TextSettings
): Promise<void> => {
  loader.load('fonts/helvetiker_regular.typeface.json', (font: unknown) => {
    const textObj = new TextGeometry(text, { font, size: 10, height: 2 });
    const colorNumber = parseInt(color.replace('#', '0x'), 16);
    const material = new MeshMatcapMaterial({ color: colorNumber });
    const mesh = new Mesh(textObj, material);
    const fontWeight = fontSize * (bold ? FONT_WEIGHT_BOLD : FONT_WEIGHT_NORMAL);

    mesh.scale.set(fontWeight, fontSize, fontSize);
    mesh.rotation.y = NORMAL_Y_TEXT_ROTATION;
    mesh.position.z = position.z;
    mesh.position.y = position.y;
    mesh.position.x = position.x;

    if (vertical) {
      mesh.rotation.z = VERTICAL_Z_TEXT_ROTATION;
      mesh.rotation.y = VERTICAL_Y_TEXT_ROTATION;
    }

    scene.add(mesh);
  });
};
