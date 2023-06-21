import * as THREE from "three";
import { SceneManager } from "../model/scene_manager";
import { Model } from "../model/model";
import { Metadata } from "./metadata";
import { Intersection } from '../core/type';
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
    material: THREE.Material,
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

    if(metadata.resizable){
      this._resizable = metadata.resizable;
    }
    this.castShadow = true;
    this.receiveShadow = false;

    if(position){
      this._position_set = true;
      this.position.copy(position);
    }

    //重心调整到盒子中心
    this.geometry.computeBoundingBox();
    if(this.geometry.boundingBox){
      this.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(
        -0.5 * (this.geometry.boundingBox.max.x + this.geometry.boundingBox.min.x),
        -0.5 * (this.geometry.boundingBox.max.y + this.geometry.boundingBox.min.y),
        -0.5 * (this.geometry.boundingBox.max.z + this.geometry.boundingBox.min.z)
      ))
    }
    this.geometry.computeBoundingBox();
    this._halfSize = this.objectHalfSize();

    if(rotation){
      this.rotation.y = rotation;
    }
    if(scale){
      // this
    }
  }



  protected abstract resized():void;

  public abstract placeInRoom():void;

  public abstract isValidPosition(vec3:THREE.Vector3): boolean;


  public get height():number {
    return this._halfSize.y * 2.0;
  }

  public get width():number{
    return this._halfSize.x * 2.0;
  }

  public get depth():number{
    return this._halfSize.z * 2.0;
  }

  public initObject():void{
    this.placeInRoom();
    this._sceneManager.needUpdate = true;
  }

  public removed(){

  }

  public clickPressed(intersection:Intersection):void{
    this._dragOffset.copy(intersection.point).sub(this.position);
  }

  public clickDragged(intersection:Intersection){
    this.moveToPoint(intersection.point.sub(this._dragOffset), intersection);
  }

  public moveToPoint(position:THREE.Vector3, intersection?:Intersection){
    this.position.copy(position);
  }

  public clickReleased(){
    if(this._error){
      this.hideError();
    }
  }

  public updateHighlight():void{
    this._highlighted = this._hover || this._selected;
    let hex:number = this._highlighted?Item._emissiveColor : 0x000000;
    
    if(Array.isArray(this.material)){
      this.material.forEach((material:THREE.Material)=>{
        if('emissive' in material){
          (<any>material).emissive.setHex(hex);
        }
      })
    }else{
      if('emissive' in this.material){
          (<any>this.material).emissive.setHex(hex);
        }
    }
  }

  public mouseOver():void{
    this._hover = true;
    this.updateHighlight();
  }

  public mouseOff():void{
    this._hover = false;
    this.updateHighlight();
  }

  public setSelected():void{
    this._selected = true;
    this.updateHighlight();
  }

  public setUnselected():void{
    this._selected = false;
    this.updateHighlight();
  }
  /**
   * 计算对象半尺寸
   */
  private objectHalfSize():THREE.Vector3{
    let box:THREE.Box3 = new THREE.Box3();
    box.setFromObject(this);
    return box.max.clone().sub(box.min).divideScalar(2);
  }

  public createGlow(color:number, opacity:number, ignoreDepth:boolean):THREE.Mesh{
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

  public showError(pos:THREE.Vector3):void{
    pos = pos || this.position;
    if(!this._error){
      this._error = true;
      this._errorGlow = this.createGlow(Item._errorColor, 0.8, true);
      this._sceneManager.add(this._errorGlow);
    }
    this._errorGlow.position.copy(pos);
  }

  public hideError(){
    if(this._error){
      this._error = false;
      this._sceneManager.remove(this._errorGlow);
    }
  }
}
