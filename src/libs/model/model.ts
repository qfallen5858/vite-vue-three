import { Callbacker } from "../core/callback";
import {SceneManager} from "./scene_manager"
export class Model{
  private _sceneManager: SceneManager;

  private _loadingCallback:Callbacker = new Callbacker();

  private _loadedCallback:Callbacker = new Callbacker();

  constructor(){
    this._sceneManager = new SceneManager(this);

  }

  public get sceneManager():SceneManager{
    return this._sceneManager;
  }
}