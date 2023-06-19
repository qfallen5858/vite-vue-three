import * as THREE from "three";
import { Item } from "../items/item";
import { Model } from "./model";
import {Utils} from "../core/utils"
export class SceneManager {

  private scene: THREE.Scene|null = null;

  private items: Item[] = [];

  private loader: THREE.ObjectLoader|null = null;

  private model: Model;

  constructor(model: Model) {
    this.scene = new THREE.Scene();
    this.loader = new THREE.ObjectLoader();
    this.model = model;
  }

  public add(mesh:THREE.Mesh){
    this.scene.add(mesh);
  }

  public remove(mesh:THREE.Mesh){
    this.scene.remove(mesh)
    Utils.removeValue(this.items, mesh);
  }

  public get scene():THREE.Scene{
    return this.scene;
  }

  public get items():Item[]{
    return this.items;
  }
}
