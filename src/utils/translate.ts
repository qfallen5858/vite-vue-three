import {indexStore} from '@/store/index'
import {divide, multiply} from 'mathjs'
interface Point {
  x: number;
  y: number;
}

interface Style {
  left: number;
  top: number;
  width: number;
  height: number;
  rotate: number;
}
const angleToRadian = (angel: number): number => {
  return (angel * Math.PI) / 180;
};

/**
 * 计算根据圆心旋转后的点的坐标
 * @param point
 * @param center
 * @param rotate
 * @returns
 */
export const calculateRotatedPointCoordinate = (
  point: Point,
  center: Point,
  rotate: number
): Point => {
  return {
    x:
      (point.x - center.x) * Math.cos(angleToRadian(rotate)) -
      (point.y - center.y) * Math.sin(angleToRadian(rotate)) +
      center.x,
    y:
      (point.x - center.x) * Math.sin(angleToRadian(rotate)) +
      (point.y - center.y) * Math.cos(angleToRadian(rotate)) +
      center.y,
  };
};

/**
 * 获取旋转后的点坐标（八个点之一）
 * @param  {Object} style  样式
 * @param  {Object} center 组件中心点
 * @param  {String} name   点名称
 * @return {Object}        旋转后的点坐标
 */
export const getRotatedPointCoordinate = (
  style: Style,
  center: Point,
  name: string
): Point => {
  let point: Point;
  switch (name) {
    case "t":
      point = {
        x: style.left + style.width / 2,
        y: style.top,
      };
      break;
    case "b":
      point = {
        x: style.left + style.width / 2,
        y: style.top + style.height,
      };
      break;
    case "l":
      point = {
        x: style.left,
        y: style.top + style.height / 2,
      };
      break;
    case "r":
      point = {
        x: style.left + style.width,
        y: style.top + style.height / 2,
      };
      break;
    case "lt":
      point = {
        x: style.left,
        y: style.top,
      };
      break;
    case "lb":
      point = {
        x: style.left,
        y: style.top + style.height,
      };
      break;
    case "rt":
      point = {
        x: style.left + style.width,
        y: style.top,
      };
      break;
    case "rb":
      point = {
        x: style.left + style.width,
        y: style.top + style.height,
      };
      break;
    default:
      point = {
        x: style.left + style.width,
        y: style.top + style.height,
      };
      break;
  }
  return calculateRotatedPointCoordinate(point, center, style.rotate);
};

export const getCenterPoint = (p1: Point, p2: Point): Point => {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
};

export const sin = (rotate:number):number => {
  return Math.abs(Math.sin(angleToRadian(rotate)))
}

export const cos = (rotate:number):number => {
  return Math.abs(Math.cos(angleToRadian(rotate)))
}

export const changeStyleWithScale = (value:number) =>{
  return multiply(value, divide(indexStore().canvasStyleData.scale, 100))
}

const needToChangeAttr = ['width', 'height', 'fontSize'];
export const changeComponentSizeWithScale = (component)=>{
  Object.keys(component.style).forEach(key=>{
    if(needToChangeAttr.includes(key)){
      if(key === 'fontSize' && component.style[key] === '')return;
      component.style[key] = changeStyleWithScale(component.style[key])
    }
  })
}

export function mod360(deg:number) :number{
  return (deg + 360) % 360
}

export const toPercent = (val:number):string => {
  return val * 100 + '%'
}
