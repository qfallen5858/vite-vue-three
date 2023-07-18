export const LogMethod = (target:any, key:string, descriptor:PropertyDescriptor) =>{
  console.log(`Method ${key} was called`)
}