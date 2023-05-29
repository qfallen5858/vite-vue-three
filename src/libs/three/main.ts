import * as THREE from 'three'

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
  
  private options: ThreeOptions = {
    resize:true,
    pushHref:false,
    spin:true,
    spinSpeed:.00002,
    canMoveFixedItems:false,
    domSelector:'#three-container'
  };
  constructor(){
    this._init();
  }

  private _init(){
    // Three.ImageUtils.crossOrigin = ''
    this.scene = new THREE.Scene();
    const domElement:HTMLElement = document.getElementById(this.options.domSelector) as HTMLElement;
    if(domElement != null){
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


  }
}