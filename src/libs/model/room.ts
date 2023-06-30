import { Corner } from "./corner";
import { RoomPlan } from "./room_plan";

export class Room{
  public interiorCorners:Corner[] = [];

  private _roomPlan:RoomPlan;

  public corners:Corner[] = []

  constructor(roomPlan:RoomPlan, corners:Corner[]){
    this._roomPlan = roomPlan;
    this.corners = corners;
  }

  private updateWalls(){
    
  }
}