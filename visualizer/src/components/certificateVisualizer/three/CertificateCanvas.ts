import { PerspectiveCamera, WebGLRenderer, Scene } from 'three';
import { renderCertificate3D, renderText } from './renders';
import { createOrbitControl, createRenderer, createCamera, createScene, Loop, FontLoader, Font } from './system';
import { ICertificate } from '../interfaces';
import {
  DEFAULT_CAMERA_Z_POSITION_LARGE_SCREEN,
  DEFAULT_CAMERA_Z_POSITION_SMALL_SCREEN,
  DEFAULT_CAMERA_Y_POSITION,
  SMALL_WIDHT
} from '../../../utils/constants';

const DEFAULT_CAMERA_X_POSITION = -3;

const loader = new FontLoader();
const FONT_ROUTE = '/fonts/helvetiker_regular.typeface.json';

export class CertificateCanvas {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  loop: Loop;
  container: HTMLElement;

  constructor(container: HTMLElement, certificate: ICertificate) {
    this.container = container;
    this.camera = createCamera(container.offsetWidth, container.offsetHeight);
    this.scene = createScene();
    this.renderer = createRenderer(container);
    this.loop = new Loop(this.camera, this.scene, this.renderer);

    const orbitControl = createOrbitControl(this.camera, this.renderer.domElement);

    this.loop.updatables.push(orbitControl);
    this.init(certificate);
    this.restartCamaraPosition();

    window.addEventListener('resize', () => this.resize());
    container.append(this.renderer.domElement);
  }

  async init(certificate: ICertificate) {
    const certificate3D = await renderCertificate3D(certificate);
    this.scene.add(certificate3D);

    loader.load(FONT_ROUTE, (font: Font) => {
      certificate.texts.forEach((text) => {
        renderText(this.scene, text, font);
      });
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  restartCamaraPosition() {
    const width = this.container.offsetWidth;

    const positionZ =
      width > SMALL_WIDHT ? DEFAULT_CAMERA_Z_POSITION_LARGE_SCREEN : DEFAULT_CAMERA_Z_POSITION_SMALL_SCREEN;

    this.camera.position.z = positionZ;
    this.camera.position.x = DEFAULT_CAMERA_X_POSITION;
    this.camera.position.y = DEFAULT_CAMERA_Y_POSITION;
  }

  start() {
    this.loop.start();
  }

  stop() {
    window.removeEventListener('resize', () => this.resize());

    this.loop.stop();
  }

  resize() {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;

    this.renderer.setSize(width, height);

    const positionZ =
      width > SMALL_WIDHT ? DEFAULT_CAMERA_Z_POSITION_LARGE_SCREEN : DEFAULT_CAMERA_Z_POSITION_SMALL_SCREEN;

    this.camera.position.z = positionZ;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
