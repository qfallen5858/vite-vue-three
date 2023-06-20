import { FloorItem } from './floor_item';


const item_types = {
  1:FloorItem
}

export class Factory{
  public static getClass(itemType){
    return item_types[itemType];
  }
}