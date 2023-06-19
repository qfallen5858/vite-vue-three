import { Callbacker } from "../core/callback";

export class Model{
  private sceneManager: SceneManager;

  private loadingCallback:Callbacker = new Callbacker();

  private loadedCallback:Callbacker = new Callbacker();

  constructor(){
    this.sceneManager = new SceneManager(this);

  }
}