// @ts-nocheck

/**
 * 深拷贝方法
 */
export function deepCopy(target:any):any{
  if(typeof target == 'object'){
    const result = Array.isArray(target)?[]:{}
    for(const key in target){
      if(typeof target[key] == 'object'){
        result[key] = deepCopy(target[key])
      }else{
        result[key] = target[key]
      }
    }
    return result;
  }
  return target;
}

/**
 * 适用于响应式数组的元素交换
 * @param arr 
 * @param i 
 * @param j 
 */
export function swap(arr:any[], i:number, j:number){
  const temp = arr[i]
  arr.value.splice(i, 1, arr.value[j])
  arr.value.splice(j, 1, temp)
}

export function $(selector:string){
  return document.querySelector(selector)
}

const components = ['VText', 'RectShape', 'CircleShape']
export function isPreventDrop(component:string){
  return !components.includes(component) && !component.startsWith('SVG')
}