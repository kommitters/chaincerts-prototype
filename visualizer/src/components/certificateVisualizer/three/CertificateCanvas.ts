import { PerspectiveCamera, WebGLRenderer, Scene } from 'three';
import { renderCertificate3D, renderText } from './renders';
import { createOrbitControl, createRenderer, createCamera, createScene, Loop, FontLoader, Font } from './system';
import { ICertificate } from '../interfaces';

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
    this.camera = createCamera(container.offsetWidth / container.offsetHeight);
    this.scene = createScene();
    this.renderer = createRenderer(container);
    window.addEventListener('resize', () => this.resize());

    container.append(this.renderer.domElement);

    const orbitControl = createOrbitControl(this.camera, this.renderer.domElement);

    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.loop.updatables.push(orbitControl);

    this.init(certificate);
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

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
