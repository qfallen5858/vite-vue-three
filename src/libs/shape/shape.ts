import {Anchor, InputPoint, OutputPoint} from './anchor'
export class Shape{
    protected _anchors:Anchor[] = [];
    protected _outPoints:OutputPoint[] = [];
    protected _inPoints:InputPoint[] = [];
}

export class Rectangle extends Shape{
    
}