import { Font } from '../system';

export interface ITextParameters {
  font: Font;
  size: number;
  height: number;
  bevelThickness?: number;
  bevelSize?: number;
  bevelEnabled?: boolean;
  bevelOffset?: number;
  depth?: number;
}
