import { Callbacker, CustomFunc } from '../core/callback';
import { CONFIG_WALL_HEIGHT, CONFIG_WALL_THICKNESS, Configuration } from '../core/configuration';
import { Utils } from '../core/utils';
import { Corner } from './corner';
import { HalfEdge } from './half_edge';
import * as INNER_JSON from './json'
const defaultWallTexture:INNER_JSON.Texture = {
  url:"rooms/textures/wallmap.png",
  stretch:true,
  scale:0
}
export class Wall{
  private _id:string;

  private _start:Corner;

  private _end:Corner;

  private _frontEdge:HalfEdge|null = null;

  private _backEdge:HalfEdge | null = null;

  private _moveCallback:Callbacker = new Callbacker();

  private _deletedCallback:Callbacker = new Callbacker();

  private _actionCallback:Callbacker = new Callbacker();

  public frontTexture:INNER_JSON.Texture = defaultWallTexture;

  public backTexture:INNER_JSON.Texture = defaultWallTexture;

  public get thinkness():number{
    return Configuration.getNumericValue(CONFIG_WALL_THICKNESS);
  }

  public get height():number{
    return Configuration.getNumericValue(CONFIG_WALL_HEIGHT);
  }
  
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

  public set frontEdge(edge:HalfEdge){
    this._frontEdge = edge;
  }

  public set backEdge(edge:HalfEdge){
    this._backEdge = edge;
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

  public getOppositeCorner(corner:Corner):Corner|null{
    if(this._start === corner){
      return this._end;
    }else if(this._end === corner){
      return this._start;
    }else{
      return null;
    }
  }

}