/**
 * Text = 3D Text
 *
 * parameters = {
 *  font: <THREE.Font>, // font
 *
 *  size: <float>, // size of the text
 *  height: <float>, // thickness to extrude text
 *  curveSegments: <int>, // number of points on the curves
 *
 *  bevelEnabled: <bool>, // turn on bevel
 *  bevelThickness: <float>, // how deep into text bevel goes
 *  bevelSize: <float>, // how far from text outline (including bevelOffset) is bevel
 *  bevelOffset: <float> // how far from text outline does bevel start
 * }
 */

import { ExtrudeGeometry } from 'three';
import { ITextParameters } from '../interfaces';

export class TextGeometry extends ExtrudeGeometry {
  constructor(text: string, parameters: ITextParameters) {
    const font = parameters.font;

    if (!font) {
      super();
    } else {
      const shapes = font.generateShapes(text, parameters.size);
      parameters.depth = !parameters.height ? parameters.height : 50;

      if (!parameters.bevelThickness) parameters.bevelThickness = 10;
      if (!parameters.bevelSize) parameters.bevelSize = 8;
      if (!parameters.bevelEnabled) parameters.bevelEnabled = false;

      super(shapes, parameters);
    }

    this.type = 'TextGeometry';
  }
}
