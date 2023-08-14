import {ElMessage} from "element-plus"

export default function toast(message:string = '', type:"error" | "success" | "warning" | "info"='error', duration:number = 1500){
  ElMessage({message, duration, type})
}