import * as THREE from "three";
import { SkyBox } from "./skybox";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Callbacker } from "../core/callback";
import { Model } from "../model/model";
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
  private _camera: THREE.PerspectiveCamera | null = null;
  private _renderer: THREE.WebGLRenderer | null = null;
  private _scene: THREE.Scene ;
  private _skyBox!: SkyBox;
  private _controls!: OrbitControls;

  private _itemSelectedCallbacker: Callbacker = new Callbacker();
  private _itemUnselectedCallbacker: Callbacker = new Callbacker();

  private _domElement: HTMLElement | null = null;
  private _lastRender!: number;

  private _needUpdate: Boolean = false;
  private _model:Model;

  private _options: ThreeOptions = {
    resize: true,
    pushHref: false,
    spin: true,
    spinSpeed: 0.00002,
    canMoveFixedItems: false,
    domSelector: "three-container",
  };
  // constructor(el: string) {
  //   this._init(el);
  // }

  constructor(model:Model, el:string, opts?:ThreeOptions){
    this._model = model;
    this._scene = this._model.sceneManager.scene;
    if(opts){
      this._options = opts;
    }
    this._init(el);
  }

  private _init(el: string) {
    // Three.ImageUtils.crossOrigin = ''

    if (el == null) {
      this._domElement = document.getElementById(
        this._options.domSelector
      ) as HTMLElement;
    } else {
      this._domElement = document.getElementById(el) as HTMLElement;
    }
    if (this._domElement == null) {
      throw new Error("domElement is null or undefined");
    }
    // this._scene = new THREE.Scene();
    this._renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._renderer.setClearColor("white");
    this._renderer.setSize(
      this._domElement.offsetWidth,
      this._domElement.offsetHeight
    );
    this._camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);
    this._domElement.appendChild(this._renderer.domElement);
    // this.camera = new THREE.PerspectiveCamera(
    //   75,
    //   this.domElement.offsetWidth / this.domElement.offsetHeight,
    //   0.1,
    //   1000
    // );
    this._camera.position.z = 15;

    this._renderer.autoClear = false;
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._skyBox = new SkyBox(this._scene);
    this._controls = new OrbitControls(this._camera, this._domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    });

    const cube = new THREE.Mesh(geometry, material);
    this._scene.add(cube);

    this.updateWindowSize();
    if (this._options.resize) {
      window.onresize = () => {
        this.updateWindowSize();
      };
    }

    this.animate();
  }

  private shouldRender(): boolean {
    if (this._needUpdate) return true;
    return false;
  }

  private render(): void {
    if (this.shouldRender()) {
      // this.renderer.clear();
      // this.renderer.clear();
    }
    if (this._scene && this._camera && this._renderer) {
      this._renderer.render(this._scene, this._camera);
    }

    this._lastRender = Date.now();
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
    if (this._domElement && this._camera && this._renderer) {
      const heightMargin: number = this._domElement.offsetTop;
      const widthMargin: number = this._domElement.offsetLeft;
      const elementWidth: number = this._domElement.clientWidth;
      let elementHeight: number;
      if (this._options.resize) {
        elementHeight = window.innerHeight - heightMargin;
      } else {
        elementHeight = this._domElement.clientHeight;
      }
      this._camera.aspect = elementWidth / elementHeight;
      this._camera.updateProjectionMatrix();

      this._renderer.setSize(elementWidth, elementHeight);
      this._needUpdate = true;
    }
  }

  public clear(): void {}
}
