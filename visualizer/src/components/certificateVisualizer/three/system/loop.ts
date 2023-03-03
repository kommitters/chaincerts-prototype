import { PerspectiveCamera, WebGLRenderer, Scene } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class Loop {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  updatables: OrbitControls[];

  constructor(camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    this.updatables.forEach((updatable) => updatable.update());
  }
}
