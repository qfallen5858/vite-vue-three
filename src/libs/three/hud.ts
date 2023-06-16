import * as THREE from "three";
import { Main } from './main';

export class HUD{
  private mainThree:Main|null = null;
  private scene:THREE.Scene;


  constructor(mainThree:Main){
    this.mainThree = mainThree;
    this.scene = new THREE.Scene();
  }

  // private makeObject()
}