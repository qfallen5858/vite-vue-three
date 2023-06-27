import * as THREE from "three";
import { Item } from "../items/item";
import { Model } from "./model";
import { Utils } from "../core/utils";
import { Callbacker } from "../core/callback";
import { Metadata } from "../items/metadata";
import {Factory} from "../items/factory"
export class SceneManager {
  private _scene: THREE.Scene;

  private _items: Item[] = [];

  private _loader: THREE.ObjectLoader;

  private _model: Model;

  private _itemLoadingCallback: Callbacker = new Callbacker();

  private _itemLoadedCallback: Callbacker = new Callbacker();

  private _itemRemovedCallback: Callbacker = new Callbacker();

  public needUpdate: boolean = false;

  constructor(model: Model) {
    this._scene = new THREE.Scene();
    this._loader = new THREE.ObjectLoader();
    this._loader.setCrossOrigin("");
    this._model = model;
  }

  public add(mesh: THREE.Mesh) {
    this.scene.add(mesh);
  }

  public remove(mesh: THREE.Mesh) {
    this.scene.remove(mesh);
    Utils.removeValue(this._items, mesh);
  }

  public get scene(): THREE.Scene {
    return this._scene;
  }

  public get items(): Item[] {
    return this._items;
  }

  public get itemCount(): number {
    return this._items.length;
  }

  public removeItem(item: Item, removeInItems: boolean = true): void {
    this._itemRemovedCallback.fire(item);
    item.removed();
    this._scene.remove(item);
    if (removeInItems) {
      Utils.removeValue(this._items, item);
    }
  }

  public clearItems(): void {
    this.items.forEach((item) => {
      this.removeItem(item, true);
    });
    this._items = [];
  }

  public addItem(
    itemType: number,
    fileName: string,
    metadata: Metadata,
    position: THREE.Vector3,
    rotation: number,
    scale: THREE.Vector3,
    fixed: boolean
  ): void {
    itemType = itemType || 1;
    let onloadCallback = (object:THREE.Object3D)=>{
      const mesh:THREE.Mesh = object.children[0] as THREE.Mesh;
      const geomerty = mesh.geometry;
      const material = mesh.material as THREE.Material;
      let item:Item = Factory.getItemInstance(itemType, this._model,metadata, geomerty, material, position, rotation, scale);
      item.fixed = fixed || false;
      this._items.push(item);
      this.add(item);
      item.initObject();
      this._itemLoadedCallback.fire(item);
    }
    
    this._itemLoadingCallback.fire();
    this._loader.load(fileName, onloadCallback);
  }
}
