import { RGFormat } from "three";
import { Callbacker } from "../core/callback";
import { Room } from "./room";
import { Wall } from "./wall";
import * as INNER_JSON from "./json";
import { Corner } from "./corner";
import { Line } from "../core/type";
import { Utils } from "../core/utils";

export class HalfEdge {
  /**
   * 逆时针的前后边
   */
  private _next: HalfEdge;

  private _prev: HalfEdge;

  private _redrawCallbacker: Callbacker = new Callbacker();

  private _isFront: boolean = false;

  private _room: Room;

  private _wall: Wall;

  private _offset: number;

  private _height: number;

  constructor(room: Room, wall: Wall, isFront: boolean) {
    this._room = room;
    this._wall = wall;
    this._isFront = isFront;
    this._offset = wall.thinkness / 2.0;
    this._height = wall.height;
    if (this._isFront) {
      this._wall.frontEdge = this;
    } else {
      this._wall.backEdge = this;
    }
  }

  public getTexture(): INNER_JSON.Texture {
    if (this._isFront) {
      return this._wall.frontTexture;
    } else {
      return this._wall.backTexture;
    }
  }

  public setTexture(url: string, isStretch: boolean, scale: number) {
    let texture = {
      url: url,
      stretch: isStretch,
      scale: scale,
    };
    if (this._isFront) {
      this._wall.frontTexture = texture;
    } else {
      this._wall.backTexture = texture;
    }
    this._redrawCallbacker.fire();
  }

  private get start(): Corner {
    if (this._isFront) {
      return this._wall.start;
    } else {
      return this._wall.end;
    }
  }

  private get end(): Corner {
    if (this._isFront) {
      return this._wall.end;
    } else {
      return this._wall.start;
    }
  }

  /**
   * 计算平分角的点
   * @param v1
   * @param v2
   */
  private halfAngleVector(
    v1: HalfEdge,
    v2: HalfEdge
  ): { x: number; y: number } {
    let v1Line: Line, v2Line: Line;
    if (!v1) {
      v1Line = {
        start: {
          x: v2.start.x - (v2.end.x - v2.start.x),
          y: v2.start.y - (v2.end.y - v2.start.y),
        },
        end: {
          x: v2.start.x,
          y: v2.start.y,
        },
      };
    } else {
      v1Line = {
        start: {
          x: v1.start.x,
          y: v1.start.y,
        },
        end: {
          x: v1.end.x,
          y: v1.end.y,
        },
      };
    }
    if (!v2) {
      v2Line = {
        start: {
          x: v1.end.x,
          y: v1.end.y,
        },
        end: {
          x: v1.end.x + v1.end.x - v1.start.x,
          y: v1.end.y + v1.end.y - v1.start.y,
        },
      };
    } else {
      v2Line = {
        start: {
          x: v2.start.x,
          y: v2.start.y,
        },
        end: {
          x: v2.end.x,
          y: v2.end.y,
        },
      };
    }

    let theta: number = Utils.angle2pi(
      v1Line.start.x - v1Line.end.x,
      v1Line.start.y - v1Line.end.y,
      v2Line.end.x - v1Line.end.x,
      v2Line.end.y - v1Line.end.y
    );

    let cs:number = Math.cos(theta / 2.0)
    let sn:number = Math.sin(theta/2.0)
    


  }
}
