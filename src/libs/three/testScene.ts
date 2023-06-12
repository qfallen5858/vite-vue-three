import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class TestScene{
  parameters: any = null;
  container: HTMLElement|null = null;

  stats:any;

  camera: THREE.PerspectiveCamera|null = null;
  scene: THREE.Scene|null = null;
  renderer: THREE.WebGLRenderer|null = null;

  onWindowResize: any;
  onWindowMouseDown:any;

  public init(el:any):void{
    this.container = el;

    const scene:THREE.Scene = this.scene = new THREE.Scene();

    const gridHelper:THREE.GridHelper = new THREE.GridHelper(3000, 60);

    scene.add(gridHelper);

    const geometry = new THREE.PlaneGeometry(10000,10000);
    geometry.rotateX(-Math.PI / 2);
    let plan = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color:0xffffff, side:THREE.DoubleSide}));
    plan.position.set(0, -5, 0);
    scene.add(plan);

    const renderer = this.renderer = new THREE.WebGLRenderer({antialias: true, logarithmicDepthBuffer:true});
    renderer.setClearColor('white');
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.container!.offsetWidth, this.container!.offsetHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    this.container!.appendChild(renderer.domElement);

    let camera = this.camera = new THREE.PerspectiveCamera(15, this.container!.offsetWidth/this.container!.offsetHeight, 1,20000);
    camera.position.set(4200, 8800, 8000);

    // let controls:OrbitControls = new OrbitControls(camera, this.renderer.domElement);

    this.anitmate();

  }


  private anitmate():void {
    requestAnimationFrame(() => {
      this.anitmate();
    });
    this.render();
  }

  private render():void {
    if(this.camera && this.scene && this.renderer){
      this.renderer.render(this.scene, this.camera);
    }
  }

  public clear():void {
    if(this.scene){
      this.scene.traverse((child:any) => {
        if(child.isMesh){
          if(child.geometry)child.geometry.dispose();
          if(child.material)child.material.dispose();
          child.clear();
        }
      });
    }
  }
}