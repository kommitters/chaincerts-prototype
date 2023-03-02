export interface IFontData {
  resolution: number;
  boundingBox: {
    yMax: number;
    yMin: number;
  };
  underlineThickness: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  glyphs: any;
  familyName: string;
}
