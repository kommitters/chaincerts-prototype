import { createCamera, createCertificate3D, createScene, createText } from './components';
import { createOrbitControl, createRenderer, Loop } from './system';
import { PerspectiveCamera, Renderer, Scene } from 'three';
import { Certificate } from '../interfaces';

export class CertificateCanvas {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: Renderer;
  loop: Loop;

  constructor(container: HTMLElement, certificate: Certificate) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer(container);

    container.append(this.renderer.domElement);

    const orbitControl = createOrbitControl(this.camera, this.renderer.domElement);

    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.loop.updatables.push(orbitControl);

    this.init(certificate);
  }

  async init(certificate: Certificate) {
    const certificate3D = await createCertificate3D(certificate);
    this.scene.add(certificate3D);

    certificate.texts.forEach((text) => {
      createText(this.scene, text);
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}
