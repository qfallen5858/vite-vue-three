interface DataParam {}



export class Callbacker {
  private callbacks: Function[] = [];

  public constructor(){

  }

//   public fire(thisArg:any, ...argArray:any[]):{
//     // for(let callback:Function of this.callbacks){
//     //     // callback.call(thisArg, argArray);
//     // }
//   }

  public add(callback: Function): void{
    this.callbacks.push(callback);
  }

  public remove(callback: Function):void{ // 可以修改为返回Function
    
  }

  public fire(...argArray: any[]):void{
    
  }


}

// interface
