export namespace KQDesign {
  
  
  
  
  const gridSpacing: number = 20;
  const gridWidth: number = 1;
  const gridColor: string = "#f1f1f1";
  
  export class Designer {
    private canvasElement: HTMLCanvasElement;

    private context: CanvasRenderingContext2D | null;

    constructor(private canvasSelector: string) {
      this.canvasElement = document.getElementById(
        this.canvasSelector
      ) as HTMLCanvasElement;
      if (this.canvasElement) {
        this.context = this.canvasElement.getContext("2d");
        let scope = this;
        window.onresize = () => {
          scope.handleWindowResize();
        };
        scope.handleWindowResize();
      }else{
        this.context = null;
      }
    }

    public handleWindowResize() {
      let parent = this.canvasElement.parentElement;
      if (parent) {
        this.canvasElement.width = parent.clientWidth;
        this.canvasElement.height = parent.clientHeight;
        this.draw();
      }
    }

    private calculateGridOffset(n: number): number {
      if (n >= 0) {
        return ((n + gridSpacing / 2.0) % gridSpacing) - gridSpacing / 2.0;
      } else {
        return ((n - gridSpacing / 2.0) % gridSpacing) + gridSpacing / 2.0;
      }
    }

    private drawLine(
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      width: number,
      color: string
    ): void {
      if (this.context) {
        this.context.beginPath();
        this.context.moveTo(startX, startY);
        this.context.lineTo(endX, endY);
        this.context.lineWidth = width;
        this.context.strokeStyle = color;
        this.context.stroke();
      }
    }

    public draw(): void {
      if (this.context == null) {
        return;
      }
      this.context.clearRect(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      this.drawGrid();
    }

    private drawGrid() {
      let offsetX = this.calculateGridOffset(0);
      let offsetY = this.calculateGridOffset(0);
      let width = this.canvasElement.width;
      let height = this.canvasElement.height;
      for(let x = 0; x < (width / gridSpacing); x++){
        this.drawLine(gridSpacing * x + offsetX, 0, gridSpacing * x + offsetX, height, gridWidth, gridColor)
      }
      for(let y = 0; y < (height / gridSpacing); y++){
        this.drawLine(0, gridSpacing * y + offsetY, width, gridSpacing * y + offsetY, gridWidth, gridColor);
      }
      // this.drawLine(0, 0, 100, 100, 2, gridColor);
    }
  }
}
