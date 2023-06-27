import { Corner } from "./corner";
import * as INNER_JSON from "./json";
import { Wall } from "./wall";

export class RoomPlan{

  private _walls:Wall[] = [];

  private _corners:Corner[] = [];
  
  constructor(){
    
  }

  public loadFloorPlan(floorPlan:INNER_JSON.FloorPlan){
    
  }
}