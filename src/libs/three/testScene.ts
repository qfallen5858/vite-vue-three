import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import WebGL from './WebGL';
export class TestScene {
  parameters: any = null;
  container: HTMLElement | null = null;

  stats: any;

  camera: THREE.PerspectiveCamera | null = null;
  scene: THREE.Scene | null = null;
  renderer: THREE.WebGLRenderer | null = null;

  onWindowResize: any;
  onWindowMousedown: any;

  cube:THREE.Mesh|null = null;

  public init(el: any): void {
    this.container = el;
    const scene: THREE.Scene = (this.scene = new THREE.Scene());

    // const gridHelper: THREE.GridHelper = new THREE.GridHelper(3000, 60);

    // scene.add(gridHelper);
    // scene.add(new THREE.AxesHelper(2000));

    // const geometry = new THREE.PlaneGeometry(10000, 10000);
    // geometry.rotateX(-Math.PI / 2);
    // let plan = new THREE.Mesh(
    //   geometry,
    //   new THREE.MeshBasicMaterial({ color: 0x123456, side: THREE.DoubleSide })
    // );
    // plan.position.set(0, -5, 0);
    // scene.add(plan);
    const geomery = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({color:0x00ff00});
    const cube = this.cube = new THREE.Mesh(geomery, material);
    scene.add(cube);
    

    const renderer = (this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true,
    }));
    renderer.setClearColor("white");
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.container!.offsetWidth, this.container!.offsetHeight);
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.VSMShadowMap;
    this.container!.appendChild(renderer.domElement);

    let camera = this.camera = new THREE.PerspectiveCamera(
      75,
      // 15,
      this.container!.offsetWidth / this.container!.offsetHeight,
      // 1,
      // 20000
      0.1,
      1000
    );
    // camera.position.set(4200, 8800, 8000);
    camera.position.z = 5;


    const stats = new Stats();
    this.container!.appendChild(stats.dom);
    // let controls:OrbitControls = new OrbitControls(camera, this.renderer.domElement);
    this.render();
    
    this.anitmate();

    let that = this;

    const onWindowResize = (this.onWindowResize = function () {
      if (that.container) {
        camera.aspect =
          that.container?.offsetWidth / that.container?.offsetHeight;
        camera.updateProjectionMatrix();
        that.renderer?.setSize(
          that.container.offsetWidth,
          that.container.offsetHeight
        );
      }
    });
    window.addEventListener("resize", onWindowResize);

    const onWindowMousedown = (this.onWindowMousedown = function (event: any) {
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();

      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
    });
    window.addEventListener("mousedown", onWindowMousedown);
  }

  private anitmate(): void {
    requestAnimationFrame(() => {
      this.anitmate();
    });
    this.render();
    this.stats.update();
  }

  private render(): void {
    if (this.camera && this.scene && this.renderer) {
      if(this.cube){
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
      }
      this.renderer.render(this.scene, this.camera);
    }
  }

  public clear(): void {
    if (this.onWindowResize) {
      window.removeEventListener("resize", this.onWindowResize);
    }
    if (this.onWindowMousedown) {
      window.removeEventListener("mousedown", this.onWindowMousedown);
    }
    if (this.scene) {
      this.scene.traverse((child: any) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
          child.clear();
        }
      });
    }
  }
}
