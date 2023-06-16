import * as THREE from "three";
import { SkyBox } from "./skybox";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Callbacker } from "../core/callback";
interface ThreeOptions {
  resize?: boolean;
  pushHref?: boolean;
  spin?: boolean;
  spinSpeed?: number;
  clickPan?: boolean;
  canMoveFixedItems?: boolean;
  domSelector: string;
}

export class Main {
  private camera: THREE.PerspectiveCamera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private skyBox!: SkyBox;
  private controls!: OrbitControls;

  private itemSelectedCallbacker: Callbacker = new Callbacker();
  private itemUnselectedCallbacker: Callbacker = new Callbacker();

  private domElement: HTMLElement | null = null;
  private lastRender!: number;

  private needUpdate: Boolean = false;

  private options: ThreeOptions = {
    resize: true,
    pushHref: false,
    spin: true,
    spinSpeed: 0.00002,
    canMoveFixedItems: false,
    domSelector: "three-container",
  };
  constructor(el: any) {
    this._init(el);
  }

  private _init(el: any) {
    // Three.ImageUtils.crossOrigin = ''

    if (el == null) {
      this.domElement = document.getElementById(
        this.options.domSelector
      ) as HTMLElement;
    } else {
      this.domElement = el;
    }
    if (this.domElement == null) {
      throw new Error("domElement is null or undefined");
    }
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setClearColor("white");
    this.renderer.setSize(
      this.domElement.offsetWidth,
      this.domElement.offsetHeight
    );
    this.camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);
    this.domElement.appendChild(this.renderer.domElement);
    // this.camera = new THREE.PerspectiveCamera(
    //   75,
    //   this.domElement.offsetWidth / this.domElement.offsetHeight,
    //   0.1,
    //   1000
    // );
    this.camera.position.z = 15;

    this.renderer.autoClear = false;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.skyBox = new SkyBox(this.scene);
    this.controls = new OrbitControls(this.camera, this.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    });

    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    this.updateWindowSize();
    if (this.options.resize) {
      // window.onresize = this.updateWindowSize as (ev:UIEvent) => any
      window.onresize = (event: UIEvent) => {
        this.updateWindowSize();
      };
    }

    this.animate();
  }

  private shouldRender(): boolean {
    if (this.needUpdate) return true;
    return false;
  }

  private render(): void {
    if (this.shouldRender()) {
      // this.renderer.clear();
      // this.renderer.clear();
    }
    if (this.scene && this.camera && this.renderer) {
      this.renderer.render(this.scene, this.camera);
    }

    this.lastRender = Date.now();
  }

  private animate(): void {
    const delay: number = 50;
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.animate();
      });
    }, delay);
    this.render();
  }
  private updateWindowSize(): void {
    if (this.domElement && this.camera && this.renderer) {
      const heightMargin: number = this.domElement.offsetTop;
      const widthMargin: number = this.domElement.offsetLeft;
      const elementWidth: number = this.domElement.clientWidth;
      let elementHeight: number;
      if (this.options.resize) {
        elementHeight = window.innerHeight - heightMargin;
      } else {
        elementHeight = this.domElement.clientHeight;
      }
      this.camera.aspect = elementWidth / elementHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(elementWidth, elementHeight);
      this.needUpdate = true;
    }
  }

  public clear(): void {}
}
