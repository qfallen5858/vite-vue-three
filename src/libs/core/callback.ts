import { Utils } from './utils';
interface DataParam {}

type CustomFunc = (...argArray: any[]) =>void

export class Callbacker {
  private callbacks: CustomFunc[] = [];

  public constructor(){

  }

//   public fire(thisArg:any, ...argArray:any[]):{
//     // for(let callback:Function of this.callbacks){
//     //     // callback.call(thisArg, argArray);
//     // }
//   }

  public fire( ...argArray: any[]){
    for(let callback of this.callbacks){
      callback(...argArray)
    }
  }
  public add(callback: CustomFunc): void{
    this.callbacks.push(callback);
  }

  public remove(callback: CustomFunc):void{ // 可以修改为返回Function
    Utils.removeValue(this.callbacks, callback);
  }

  // public fire(...argArray: any[]):void{
    
  // }


}

// interface
