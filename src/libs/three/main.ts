import * as THREE from 'three'
import { SkyBox } from './skybox';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {Callbacker} from "../core/callback"
interface ThreeOptions{
  resize?: boolean;
  pushHref?: boolean;
  spin?: boolean;
  spinSpeed?: number;
  clickPan?: boolean;
  canMoveFixedItems?: boolean;
  domSelector: string;
}

export class Main{
  private camera!: THREE.PerspectiveCamera;
  private renderer!:THREE.Renderer;
  private scene!:THREE.Scene;
  private skyBox!: SkyBox;
  private controls!: OrbitControls;

  private itemSelectedCallbacker:Callbacker = new Callbacker();
  private itemUnselectedCallbacker:Callbacker = new Callbacker();

  private domElement!:HTMLElement;
  private lastRender!:number;

  private needUpdate:Boolean = false;
  
  private options: ThreeOptions = {
    resize:true,
    pushHref:false,
    spin:true,
    spinSpeed:.00002,
    canMoveFixedItems:false,
    domSelector:'three-container'
  };
  constructor(){
    this._init();
  }

  private _init(){
    // Three.ImageUtils.crossOrigin = ''
    this.scene = new THREE.Scene();
    this.domElement = document.getElementById(this.options.domSelector) as HTMLElement;
    if(this.domElement == null){
      throw new Error('domElement is null or undefined');
    }
    this.camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer:true
    });
  
    this.renderer.autoClear = false;
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapSoft = true;
    this.renderer.shadowMapType = THREE.PCFSoftShadowMap;

    this.skyBox = new SkyBox(this.scene);
    this.controls = new OrbitControls(this.camera, this.domElement);

    this.domElement.appendChild(this.renderer.domElement);

    this.updateWindowSize();
    if(this.options.resize){
      window.onresize = this.updateWindowSize as (ev:UIEvent) => any
    }

    
  }

  private shouldRender():boolean {
    if(this.needUpdate) return true
    return false;
  }

  private render() :void{
    if(this.shouldRender()){
      // this.renderer.clear();
    }
    this.lastRender = Date.now();
  }

  private animate():void{
    const delay:number = 50;
    setTimeout(()=>{
      requestAnimationFrame(this.animate)
    },delay);
    this.render()
  }
  private updateWindowSize():void{
    const heightMargin:number = this.domElement.offsetTop;
    const widthMargin:number = this.domElement.offsetLeft;

    const elementWidth:number = this.domElement.clientWidth;
    let elementHeight:number;
    if(this.options.resize){
      elementHeight = window.innerHeight - heightMargin
    }else{
      elementHeight = this.domElement.clientHeight
    }
    this.camera.aspect = elementWidth / elementHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(elementWidth, elementHeight);
    this.needUpdate = true;
  }
}