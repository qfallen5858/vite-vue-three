import * as THREE from 'three'

interface ThreeOptions{
  resize?: boolean;
  pushHref?: boolean;
  spin?: boolean;
  spinSpeed?: number;
  clickPan?: boolean;
  canMoveFixedItems?: boolean;
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
    canMoveFixedItems:false
  };
  constructor(){

  }

  private _init(){
    // Three.ImageUtils.crossOrigin = ''
    this.scene = new THREE.Scene();
  }
}