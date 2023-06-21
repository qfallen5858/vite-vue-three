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

  }
}