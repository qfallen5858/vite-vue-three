export interface Point{
  x:number,
  y:number
}

export interface Corners{
  [key:string]:Point
}

export interface Texture{
  url:string,
  stretch:boolean,
  scale:number
}

export interface Wall{
  corner1:string,
  corner2:string,
  frontTexture:Texture,
  backTexture:Texture
}

export interface FloorPlan{
  corners:Corners,
  walls:Wall[],
  // wallTextures:Texture[],
  // floorTextures:Texture
  // newFloorTexture:Texture
} 

export interface Item{
  xpos:number,
  ypos:number,
  zpos:number,
  item_name:string,
  resizable:boolean,
  item_type:number,
  model_url:string,
  scale_x:number,
  scale_y:number,
  scale_z:number,
  rotate:number
}

export interface Plan{
  floorplan:FloorPlan,
  items:Item[]
}