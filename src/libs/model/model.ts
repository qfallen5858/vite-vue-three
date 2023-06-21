import { Callbacker } from "../core/callback";
import { RoomPlan } from "./room_plan";
import {SceneManager} from "./scene_manager"
import * as INNER_JSON from "./json"
export class Model{

  private _roomPlan:RoomPlan

  private _sceneManager: SceneManager;

  private _loadingCallback:Callbacker = new Callbacker();

  private _loadedCallback:Callbacker = new Callbacker();

  private _savedCallback:Callbacker = new Callbacker();

  private _deletedCallback:Callbacker = new Callbacker();

  constructor(){
    this._sceneManager = new SceneManager(this);
    this._roomPlan = new RoomPlan();
  }

  public get sceneManager():SceneManager{
    return this._sceneManager;
  }

  public get roomPlan():RoomPlan{
    return this._roomPlan;
  }

  public loadJson(json:string):void{
    this._loadingCallback.fire();
    // let data = JSON.parse(json);
    const planJson:INNER_JSON.Plan = JSON.parse(json);
    console.log(planJson.floorplan.walls.length);
    this._loadedCallback.fire();
  }
}