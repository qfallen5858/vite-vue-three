import { defineStore, storeToRefs} from "pinia";
import { $, deepCopy, swap } from "@/utils/utils";
import toast from "@/utils/toast";

export const indexStore = defineStore("main", {
  state: () => {
    return {
      editMode:'edit', //edit or preview
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
      isInEditor:false,
      componentData: [],
      curComponent: null,
      curComponentIndex: null as number,
      // 点击画布时是否点中组件，主要用于取消选中组件用。
      // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
      isClickComponent: false,
      areaData: {},
    };
  },
  getters: {
    request(state){
      return state.curComponent.request;
    }
  },
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
    },
    deleteComponent(index:number|undefined){
      if(index === undefined){
        index = this.curComponentIndex;
      }
      if(index == this.curComponentIndex){
        this.curComponent = null
        this.curComponentIndex = null
      }
      if(index != null){
        this.componentData.splice(index,1)
      }
    },
    setClickComponentStatus(value:boolean){
      this.isClickComponent = value;
    },
    setInEditorStatus(value:boolean){
      this.isInEditor = value;
    },
    setShapeStyle(pos){
      if(!this.curComponent){
        return;
      }
      if(pos.top)this.curComponent.style.top = Math.round(pos.top)
      if(pos.left)this.curComponent.style.left = Math.round(pos.left)
      if(pos.width)this.curComponent.style.width = Math.round(pos.width)
      if(pos.height)this.curComponent.style.height = Math.round(pos.height)
      if(pos.rotate)this.curComponent.style.rotate = Math.round(pos.rotate)
    },
    setShapeSingleStyle({key,value}){
      if(!this.curComponent)return
      this.curComponent.style[key] = value
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

export const layerStore = defineStore("layer", {
  state:()=> {
      return {

      }
  },
  actions:{
    upComponent(){
      const _indexStore = indexStore()
      const {componentData, curComponentIndex} = _indexStore;
      if(curComponentIndex < componentData.length - 1){
        swap(componentData, curComponentIndex, curComponentIndex + 1)
        _indexStore.curComponentIndex = curComponentIndex + 1
        _indexStore.componentData = componentData
      }else{
        toast("already top")
      }
    },
    downComponent(){
      const _indexStore = indexStore()
      const {componentData, curComponentIndex} = _indexStore;
      if(curComponentIndex >0){
        swap(componentData, curComponentIndex, curComponentIndex - 1)
        _indexStore.curComponentIndex = curComponentIndex - 1
        _indexStore.componentData = componentData
      }else{
        toast("already bottom")
      }
    },
    topComponent(){
      const _indexStore = indexStore()
      const {componentData, curComponentIndex, curComponent} = _indexStore;
      if(curComponentIndex < componentData.length - 1){
        componentData.splice(curComponentIndex, 1)
        componentData.push(curComponent)
        _indexStore.curComponentIndex = componentData.length - 1
        _indexStore.componentData = componentData
      }else{
        toast("already top")
      }
    },
    bottomComponent(){
      const _indexStore = indexStore()
      const {componentData, curComponentIndex, curComponent} = _indexStore;
      if(curComponentIndex > 0){
        componentData.splice(curComponentIndex, 1)
        componentData.unshift(curComponent)
        _indexStore.curComponentIndex = 0
        _indexStore.componentData = componentData
      }else{
        toast("already bottom")
      }
    }


  }
})
