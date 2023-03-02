import { MeshMatcapMaterial, Mesh, Scene } from 'three';
import { TextGeometry, Font } from '../system';
import { ITextSettings } from '../../interfaces';

const DEFAULT_TEXT_HEIGHT = 3;
const DEFAULT_TEXT_SIZE = 10;
const FONT_WEIGHT_BOLD = 1.1;
const FONT_WEIGHT_NORMAL = 1;
const NORMAL_Y_TEXT_ROTATION = 3.2;
const VERTICAL_Y_TEXT_ROTATION = 1.5;
const VERTICAL_Z_TEXT_ROTATION = 1.57;
const WHITE_IN_HEX = '0xffffff';
const FONT_DEPTH_PERCENTAGE = 0.04;

export const renderText = (
  scene: Scene,
  { text, fontSize, position, color = WHITE_IN_HEX, vertical = false, bold = false }: ITextSettings,
  font: Font
): void => {
  const textObj = new TextGeometry(text, { font, size: DEFAULT_TEXT_SIZE, height: DEFAULT_TEXT_HEIGHT });
  const material = new MeshMatcapMaterial({ color: convertHexToInt(color) });
  const mesh = new Mesh(textObj, material);

  const fontWeight = fontSize * (bold ? FONT_WEIGHT_BOLD : FONT_WEIGHT_NORMAL);
  const fontHeight = fontSize;
  const fontDepth = fontSize * FONT_DEPTH_PERCENTAGE;

  mesh.scale.set(fontWeight, fontHeight, fontDepth);

  mesh.rotation.y = NORMAL_Y_TEXT_ROTATION;
  mesh.position.z = position.z;
  mesh.position.y = position.y;
  mesh.position.x = position.x;

  if (vertical) {
    mesh.rotation.z = VERTICAL_Z_TEXT_ROTATION;
    mesh.rotation.y = VERTICAL_Y_TEXT_ROTATION;
  }

  scene.add(mesh);
};

const convertHexToInt = (color: string): number => parseInt(color.replace('#', '0x'), 16);
