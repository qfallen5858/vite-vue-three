import * as _ from 'lodash';
import { Wall } from './wall';
import { Callbacker, CustomFunc } from '../core/callback';
import { Utils } from '../core/utils';
const cornerTolerance:number = 20;
export class Corner{
  private _x:number;
  private _y:number;
  private _id:string;

  /**
   * 以当前角落做起点的墙
   */
  private _wallStarts:Wall[] = [];

  /**
   * 以当前角落做终点的墙
   */
  private _wallEnds:Wall[] = [];

  private _movedCallback:Callbacker = new Callbacker();

  private _deletedCallback:Callbacker = new Callbacker();

  private _actionCallback:Callbacker = new Callbacker();

  constructor(x:number, y:number, id?:string){
    this._x = x;
    this._y = y;
    this._id = id || _.uniqueId();
  }

  public get id():string {
    return this._id;
  }

  public get x():number{
    return this._x;
  }

  public get y():number{
    return this._y;
  }

  public fireOnMove(func:CustomFunc):void{
    this._movedCallback.add(func);
  }

  public fireOnDelete(func:CustomFunc):void{
    this._deletedCallback.add(func);
  }

  public fireOnAction(func:CustomFunc):void{
    this._actionCallback.add(func);
  }

  /**
   * 对齐到其他相邻角落的坐标值
   * @param tolerance 
   * @returns 
   */
  public snapToAxis(tolerance:number):{x:boolean, y:boolean}{
    let snapped = {
      x:false,
      y:false
    }
    let corners:Corner[] = this.adjacentCorners();
    for(let i = 0 ; i < corners.length; i++){
      //todo 这里可能需要考虑是否需要全部遍历
      let corner:Corner = corners[i];
      if(snapped.x == false && Math.abs(corner.x - this._x) < tolerance){
        this._x = corner.x;
        snapped.x = true;
      }
      if(snapped.y == false && Math.abs(corner.y - this._y) < tolerance){
        this._y = corner.y;
        snapped.y = true;
      }
      if(snapped.x && snapped.y){
        break;
      }
    }
    return snapped;
  }

  public attachStart(wall:Wall):void{
    this._wallStarts.push(wall);
  }

  public attachEnd(wall:Wall):void{
    this._wallEnds.push(wall);
  }


  public detachWall(wall:Wall):void{
    Utils.removeValue(this._wallStarts, wall);
    Utils.removeValue(this._wallEnds, wall);
    if(this._wallEnds.length == 0 && this._wallStarts.length == 0){
      this.remove();
    }
  }



  public remove():void{
    this._deletedCallback.fire(this);
  }

  public distanceFromOtherCorner(corner:Corner):number{
    return Utils.distance(this.x, this.y, corner.x, corner.y);
  }

  public findWallFromEndCorner(corner:Corner):Wall|null{
    for(let i = 0;i < this._wallStarts.length; i++){
      if(this._wallStarts[i].end === corner){
        return this._wallStarts[i];
      }
    }
    return null;
  }

  public findWallFromStartCorner(corner:Corner):Wall|null{
    for(let i = 0;i < this._wallEnds.length; i++){
      if(this._wallEnds[i].start === corner){
        return this._wallEnds[i];
      }
    }
    return null;
  }

  public findWallFromOtherCorner(corner:Corner):Wall|null{
    return this.findWallFromStartCorner(corner) || this.findWallFromEndCorner(corner);
  }


  /**
   * 返回所有相邻的角落（相邻关系由wall确定）
   * @returns 
   */
  private adjacentCorners():Corner[]{
    let corners:Corner[] = [];
    this._wallStarts.forEach((wall:Wall) =>{
      corners.push(wall.end)
    })
    this._wallEnds.forEach((wall:Wall)=>{
      corners.push(wall.start)
    })
    return corners;
  }

  private removeInvalidWalls():void{
    let wallEndPoints = {};
    for(let i = this._wallStarts.length - 1; i >= 0; i--){
      if(this._wallStarts[i].end === this){

      }
    }

    for(let i = this._wallStarts.length - 1; i >= 0; i--){
      
    }
  }

}