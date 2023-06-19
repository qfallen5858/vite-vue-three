import * as THREE from "three";
import { SceneManager } from "../model/scene_manager";
import { Model } from "../model/model";
import { Metadata } from "./metadata";
export abstract class Item extends THREE.Mesh {
  private _sceneManager: SceneManager;

  protected _model: Model;

  protected _metadata: Metadata;

  private _errorGlow:THREE.Mesh = new THREE.Mesh();

  private _hover:boolean = false;

  private _selected:boolean = false;

  private _highlighted:boolean = false;

  private _error:boolean = false;

  private static _emissiveColor:number = 0x44444444;

  private static _errorColor:number = 0xff0000

  private _resizable:boolean = false;

  protected obstructFloorMoves:boolean = false;

  protected _position_set:boolean = false;

  protected _allow_rotate:boolean = false;

  public fixed = false;

  private _dragOffset:THREE.Vector3 = new THREE.Vector3();

  protected _halfSize: THREE.Vector3;

  constructor(
    model: Model,
    metadata: Metadata,
    geometry: THREE.BufferGeometry,
    material: THREE.MeshBasicMaterial,
    position: THREE.Vector3,
    rotation: number,
    scale: THREE.Vector3
  ) {
    super();
    this._model = model;
    this._sceneManager = this._model.sceneManager;
    this._metadata = metadata;

    this.geometry = geometry;
    this.material = material;

    this._resizable = metadata.resizable;

    this.castShadow = true;
    this.receiveShadow = false;

    if(position){
      this._position_set = true;
      this.position.copy(position);
    }

    //重心调整到盒子中心
    this.geometry.computeBoundingBox();
    this.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(
      -0.5 * (this.geometry.boundingBox.max.x + this.geometry.boundingBox.min.x),
      -0.5 * (this.geometry.boundingBox.max.y + this.geometry.boundingBox.min.y),
      -0.5 * (this.geometry.boundingBox.max.z + this.geometry.boundingBox.min.z)
    ))
    this.geometry.computeBoundingBox();
    this._halfSize = this.objectHalfSize();

    if(rotation){
      this.rotation.y = rotation;
    }
    if(scale){
      this
    }

  }

  protected abstract resized();

  public abstract placeInRoom();

  public abstract isValidPosition(vec3:THREE.Vector3): boolean;
  /**
   * 计算对象半尺寸
   */
  private objectHalfSize():THREE.Vector3{
    let box:THREE.Box3 = new THREE.Box3();
    box.setFromObject(this);
    return box.max.clone().sub(box.min).divideScalar(2);
  }

  public createGlow(color, opacity:number, ignoreDepth:boolean):THREE.Mesh{
    ignoreDepth = ignoreDepth ||false;
    opacity = opacity || 0.2
    let glowMaterial:THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      color:color,
      blending:THREE.AdditiveBlending,
      opacity:opacity,
      transparent:true,
      depthTest: !ignoreDepth
    })

    let glow = new THREE.Mesh(<THREE.BufferGeometry>this.geometry.clone(), glowMaterial);
    glow.position.copy(this.position)
    glow.rotation.copy(this.rotation)
    glow.scale.copy(this.scale)
    return glow;

  }
}
