import { FloorItem } from "./floor_item";
import { Item } from "./item";
import { Model } from "../model/model";
import { Metadata } from "./metadata";

const item_types = {
  1: FloorItem,
};

export class Factory {
  // public static getClass(itemType){
  //   return item_types[itemType];
  // }

  public static getItemInstance(
    itemType: number,
    model: Model,
    metadata: Metadata,
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    position: THREE.Vector3,
    rotation: number,
    scale: THREE.Vector3
  ): Item {
    if (itemType == 1) {
      //todo 添加逻辑判断
    }
    return new FloorItem(
      model,
      metadata,
      geometry,
      material,
      position,
      rotation,
      scale
    );
  }
}
