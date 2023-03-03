import { FileLoader, Loader, ShapePath } from 'three';
import { IFontData } from '../interfaces';

class FontLoader extends Loader {
  load(url: string, onLoad: (font: Font) => void, onProgress?: () => void, onError?: () => void) {
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(
      url,
      (text) => {
        const font = this.parse(JSON.parse(text as string));

        if (onLoad) onLoad(font);
      },
      onProgress,
      onError
    );
  }

  parse(data: IFontData) {
    return new Font(data);
  }
}

class Font {
  isFont: boolean;
  type: string;
  data: IFontData;

  constructor(data: IFontData) {
    this.isFont = true;
    this.type = 'Font';
    this.data = data;
  }

  generateShapes(text: string, size = 100) {
    const shapes = [];
    const paths = createPaths(text, size, this.data);

    for (let p = 0, pl = paths.length; p < pl; p++) {
      shapes.push(...paths[p].toShapes(false));
    }

    return shapes;
  }
}

const createPaths = (text: string, size: number, data: IFontData) => {
  const chars = Array.from(text);
  const scale = size / data.resolution;
  const line_height = (data.boundingBox.yMax - data.boundingBox.yMin + data.underlineThickness) * scale;

  const paths = [];

  let offsetX = 0,
    offsetY = 0;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    if (char === '\n') {
      offsetX = 0;
      offsetY -= line_height;
    } else {
      const ret = createPath(char, scale, offsetX, offsetY, data)!;
      offsetX += ret.offsetX;
      paths.push(ret.path);
    }
  }

  return paths;
};

const createPath = (char: string, scale: number, offsetX: number, offsetY: number, data: IFontData) => {
  const glyph = data.glyphs[char] || data.glyphs['?'];

  if (!glyph) {
    console.error('THREE.Font: character "' + char + '" does not exists in font family ' + data.familyName + '.');

    return;
  }

  const path = new ShapePath();

  let x, y, cpx, cpy, cpx1, cpy1, cpx2, cpy2;

  if (glyph.o) {
    const outline = glyph._cachedOutline || (glyph._cachedOutline = glyph.o.split(' '));

    for (let i = 0, l = outline.length; i < l; ) {
      const action = outline[i++];

      switch (action) {
        case 'm': // moveTo
          x = outline[i++] * scale + offsetX;
          y = outline[i++] * scale + offsetY;

          path.moveTo(x, y);

          break;

        case 'l': // lineTo
          x = outline[i++] * scale + offsetX;
          y = outline[i++] * scale + offsetY;

          path.lineTo(x, y);

          break;

        case 'q': // quadraticCurveTo
          cpx = outline[i++] * scale + offsetX;
          cpy = outline[i++] * scale + offsetY;
          cpx1 = outline[i++] * scale + offsetX;
          cpy1 = outline[i++] * scale + offsetY;

          path.quadraticCurveTo(cpx1, cpy1, cpx, cpy);

          break;

        case 'b': // bezierCurveTo
          cpx = outline[i++] * scale + offsetX;
          cpy = outline[i++] * scale + offsetY;
          cpx1 = outline[i++] * scale + offsetX;
          cpy1 = outline[i++] * scale + offsetY;
          cpx2 = outline[i++] * scale + offsetX;
          cpy2 = outline[i++] * scale + offsetY;

          path.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, cpx, cpy);

          break;

        default:
          break;
      }
    }
  }

  return { offsetX: glyph.ha * scale, path: path };
};

export { FontLoader, Font };
