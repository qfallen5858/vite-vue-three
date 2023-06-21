import * as THREE from "three";
import { Item } from "./item";
import { Model } from "../model/model";
import { Metadata } from "./metadata";
import { Intersection } from "../core/type";
export class FloorItem extends Item {

  constructor(
    model: Model,
    metadata: Metadata,
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    position: THREE.Vector3,
    rotation: number,
    scale: THREE.Vector3
  ) {
    super(model, metadata, geometry, material, position, rotation, scale);
  }

  protected resized(): void {
    this.position.y = this._halfSize.y;
  }
  public placeInRoom(): void {
    //TODO make placeInRoom logic
    // throw new Error("Method not implemented.");
  }
  public isValidPosition(vec3: THREE.Vector3): boolean {
    //TODO:nead 
    return true;
  }

  public moveToPoint(position: THREE.Vector3, intersection?: Intersection | undefined): void {
      if(this.isValidPosition(position)) {
        this.hideError();
        position.y = this.position.y;
        this.position.copy(position);
      }else{
        this.showError(position);
      }
  }
}
