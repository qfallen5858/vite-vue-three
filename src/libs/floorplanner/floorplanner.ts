namespace BP3D {
  export class Floorplanner {
    private canvasElement: HTMLCanvasElement;

    private context: CanvasRenderingContext2D | null;

    constructor(private cavasSelector: string) {
      this.canvasElement = document.getElementById(
        cavasSelector
      ) as HTMLCanvasElement;
      this.context = this.canvasElement.getContext("2d");
      let scope = this;
      window.onresize = () => {
        scope.handleWindowResize();
      };
      scope.handleWindowResize();
    }

    public handleWindowResize() {
      let parent = this.canvasElement.parentElement;
      if (parent) {
        this.canvasElement.width = parent.clientWidth;
        this.canvasElement.height = parent.clientHeight;
        this.draw();
      }
    }

    public draw() {
        if(this.context == null){
            return;
        }
        this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.drawGrid();
    }

    private drawGrid(){
        
    }
  }
}
export {};
