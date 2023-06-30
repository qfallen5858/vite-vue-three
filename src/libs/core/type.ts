import { Vector3, Mesh } from "three";

export interface Intersection{
  point:Vector3,
  object:Mesh
}

export type Line = {
  start: { x: number; y: number };
  end: { x: number; y: number };
};