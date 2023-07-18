import { defineStore } from "pinia";
import { $, deepCopy } from "@/utils/utils";

export const indexStore = defineStore("main", {
  state: () => {
    return {
      canvasStyleData: {
        // 页面全局数据
        width: 1200 as number,
        height: 740 as number,
        scale: 100 as number,
        color: "#000" as string,
        opacity: 1 as number,
        background: "#fff" as string,
        fontSize: 14 as number,
      },
      componentData: [],
      curComponent: null,
      curComponentIndex: null as number,
      // 点击画布时是否点中组件，主要用于取消选中组件用。
      // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
      isClickComponent: false,
      areaData: {},
    };
  },
  getters: {},
  actions: {
    setCurComponent(component:any, index:number ){
      this.curComponent = component;
      this.curComponentIndex = index;
    },
    addComponent(component:any, index:number){
      if(index !== undefined){
        this.componentData.splice(index, 0, component)
      }else{
        this.componentData.push(component)
      }
    }
  },
});

export const composeStore = defineStore("compose", {
  state: () => {
    return {
      areaData: {
        // 选中区域包含的组件以及区域位移信息
        style: {
          top: 0 as number,
          left: 0 as number,
          width: 0 as number,
          height: 0 as number,
        },
        components: [],
      },
      editor: null as Element | null,
    };
  },
  actions: {
    getEditor() {
      this.editor = $("#editor");
    },
    setAreaData(data:{style:{top:number, left:number, width:number, height:number }, components:any[]}){
      this.areaData = data;
    }
  },
});

export const contextMenuStore = defineStore("contextMenu", {
  state: () => {
    return {
      menuTop: 0 as number,
      menuLeft: 0 as number,
      menuShow: false as boolean,
    };
  },
  actions: {
    showContextMenu(left: number, top: number) {
      this.menuLeft = left;
      this.menuTop = top;
      this.menuShow = true;
    },
    hideContextMenu() {
      this.menuShow = false;
    },
  },
});

export const snapshotStore = defineStore("snapshot", {
  state: () =>{
    return {
      snapshotData:[],
      snapshotIndex:-1
    }
  },
  actions:{
    recordSnapshot(){
      this.snapshotData[++this.snapshotIndex] = deepCopy(indexStore().componentData)
      if(this.snapshotIndex < this.snapshotData.length - 1){
        this.snapshotData = this.snapshotData.slice(0,this.snapshotIndex + 1)
      }
    }
  }
})
