import { defineStore } from "pinia";

interface StyleData {
  width: number;
  height: number;
  scale: number;
  color: string;
  background: string;
  opacity: number;
}

export const mainStore = defineStore("main", {
  state: () => {
    return {
      editMode: "edit",
      canvasStyleData: {
        width: 1200,
        height: 740,
        scale: 100,
        color: "#000",
        background: "#fff",
        opacity: 1,
      },
      isInEditor:false,
      curComponent: null,
      curComponentIndex: null,
      isClickComponent:false, //判断点击画布时，是否点中组件
    };
  },
  actions: {
    aceSetCanvasData(value: StyleData) {
      this.canvasStyleData = value;
    },

    setInEditorStatus(value:boolean){
      this.isInEditor = value;
    },

    setClickComponentStatus(value:boolean){
      this.isClickComponent = value;
    },

    setCurComponent(component, index){
      this.curComponet = component;
      this.curComponentIndex = index;
    }

    


    
  },
});
