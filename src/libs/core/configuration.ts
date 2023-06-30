export const CONFIG_WALL_THICKNESS = 'wallThickness'
export const CONFIG_WALL_HEIGHT = 'wallHeight'
export const CONFIG_DIM_UNIT = 'dimUnit'

export class Configuration{
  private static data:{[key:string]:any} = {
    // CONFIG_DIM_UNIT:
    CONFIG_WALL_HEIGHT:250,
    CONFIG_WALL_THICKNESS:10
  }

  public static setValue(key:string, value:string|number):void{
    this.data[key] = value;
  }

  public static getStringValue(key:string):string{
    switch(key){
      default:
        throw new Error("Invalid key:" + key)
    }
  }

  public static getNumericValue(key:string):number{
    switch(key){
      case CONFIG_WALL_HEIGHT:
      case CONFIG_WALL_THICKNESS:
        return this.data[key] as number
      default:
        throw new Error("Invalid key:" + key)
    }
  }
}