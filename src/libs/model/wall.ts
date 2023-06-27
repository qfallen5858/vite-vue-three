import { Callbacker, CustomFunc } from '../core/callback';
import { Utils } from '../core/utils';
import { Corner } from './corner';
import * as INNER_JSON from './json'
const defaultWallTexture:INNER_JSON.Texture = {
  url:"rooms/textures/wallmap.png",
  stretch:true,
  scale:0
}
export class Wall{
  private _id:string;

  private _start:Corner;

  private _moveCallback:Callbacker = new Callbacker();

  private _deletedCallback:Callbacker = new Callbacker();

  private _actionCallback:Callbacker = new Callbacker();

  private _end:Corner;
  constructor(start:Corner, end:Corner){
    this._start = start;
    this._end = end;
    this._id = [this._start.id, this._end.id].join('-');
  }

  public get start():Corner{
    return this._start;
  }

  public get end():Corner{
    return this._end;
  }
  
  public remove():void{
    this._start.detachWall(this);
    this._end.detachWall(this);
    this._deletedCallback.fire(this);
  }

  public set start(corner:Corner){
    this._start.detachWall(this);
    corner.attachStart(this);
    this._start = corner;
    this.fireMoved();
  }

  public set end(corner:Corner){
    this._end.detachWall(this);
    corner.attachEnd(this);
    this._end = corner;
    this.fireMoved();
  }

  public fireOnMove(func:CustomFunc):void{
    this._moveCallback.add(func)
  }

  public fireOnDelete(func:CustomFunc):void{
    this._deletedCallback.add(func);
  }

  public fireOnAction(func:CustomFunc):void{
    this._actionCallback.add(func);
  }

  public fireMoved():void{
    this._moveCallback.fire();
  }

  public distanceFrom( point:{x:number, y:number}):number{
    return Utils.pointDistanceFromLine(point.x, point.y, this._start.x, this._start.y, this._end.x, this._end.y)
  }

}