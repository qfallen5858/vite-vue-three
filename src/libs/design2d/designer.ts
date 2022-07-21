import { DesignerView, DesignMode } from "./designer_view";
import { KQPosition } from "../core/types";
const gridSpacing: number = 20;
const gridWidth: number = 1;
const gridColor: string = "#f1f1f1";

export class Designer {
  public originPosition: KQPosition = { x: 0, y: 0 };
  public originX: number = 0;

  public originY: number = 0;

  private view: DesignerView;

  private canvasElement: HTMLCanvasElement;

  private mode!: DesignMode;

  private isMouseDown: boolean = false;

  private isMouseMoving: boolean = false;

  // 上次鼠标点击的坐标
  private lastMouseClickPosition: KQPosition = { x: 0, y: 0 };
  private lastMouseClickX: number = 0;
  private lastMouseClickY: number = 0;

  constructor(private canvasSelector: string) {
    this.canvasElement = document.getElementById(
      canvasSelector
    ) as HTMLCanvasElement;
    this.view = new DesignerView(this, this.canvasSelector);
    this.canvasElement.addEventListener("mousedown", (e) => {
      this.mousedown(e);
    });
    this.canvasElement.addEventListener("mousemove", (e) => {
      this.mousemove(e);
    });
    this.canvasElement.addEventListener("mouseup", (e) => {
      this.mouseup(e);
    });
    this.canvasElement.addEventListener("mouseout", (e) => {
      this.mouseout(e);
    });
    this.setMode(DesignMode.MOVE);
    document.addEventListener("keyup", (e) => {
      this.keyup(e);
    });
  }

  private keyup(event: KeyboardEvent): void {
    if (event.code === "Escape") {
      this.setMode(DesignMode.MOVE);
    }
  }

  public setMode(mode: DesignMode) {
    this.mode = mode;
  }

  private mousedown(event: MouseEvent): void {}

  private mousemove(event: MouseEvent): void {}

  private mouseup(event: MouseEvent): void {
    console.log("mouse up: " + event);
    console.log(this);
  }

  private mouseout(event: MouseEvent): void {}
}
