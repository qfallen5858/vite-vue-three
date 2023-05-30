import * as THREE from 'three'

const topColor:number = 0xffffff;
const bottomColor:number = 0xe9e9e9;
const verticalOffset:number = 500;
const sphereRadius:number = 4000;
const widthSegment:number = 32;
const heightSegment:number = 15;
const verticalShader:string = [
  "varying vec3 vWorldPosition;",
  "void main() {",
  "  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
  "  vWorldPosition = worldPosition.xyz;",
  "  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
  "}"].join('\n');
const fragmentShader:string = [
  "uniform vec3 topColor;",
  "uniform vec3 bottomColor;",
  "uniform float offset;",
  "varying vec3 vWorldPosition;",
  "void main() {",
  "  float h = normalize( vWorldPosition + offset ).y;",
  "  gl_FragColor = vec4( mix( bottomColor, topColor, (h + 1.0) / 2.0), 1.0 );",
  "}"].join('\n');

export class SkyBox{
  private _scene: THREE.Scene

  public constructor(scene: THREE.Scene){
    this._scene = scene
  }

  private _init(){

    const uniforms = {
      topColor:{
        type:'c',
        value:new THREE.Color(topColor)
      },
      bottomColor:{
        type:'c',
        value:new THREE.Color(bottomColor)
      },
      offset:{
        type:"f",
        value:verticalOffset
      }
    }


    const skyGeo:THREE.SphereGeometry = new THREE.SphereGeometry(sphereRadius, widthSegment, heightSegment)
    const skyMaterial:THREE.ShaderMaterial = new THREE.ShaderMaterial({
      vertexShader:verticalShader,
      fragmentShader:fragmentShader,
      uniforms:uniforms,
      side:THREE.BackSide
    })
    const sky:THREE.Mesh = new THREE.Mesh(skyGeo, skyMaterial);
    this._scene.add(sky)
  }
}