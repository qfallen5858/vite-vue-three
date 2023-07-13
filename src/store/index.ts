import { defineStore } from "pinia";

export const indexStore = defineStore("main", {
  state: () => {
    return {
      canvasStyleData: {
        // 页面全局数据
        width: 1200,
        height: 740,
        scale: 100,
        color: "#000",
        opacity: 1,
        background: "#fff",
        fontSize: 14,
      },
      componentData: [],
      curComponent: null,
      curComponentIndex: null,
      areaData: {},
    };
  },
  getters: {},
  actions: {},
});

export const composeStore = defineStore("compose", {
  state: () => {
    return {
      areaData: {
        // 选中区域包含的组件以及区域位移信息
        style: {
          top: 0,
          left: 0,
          width: 0,
          height: 0,
        },
        components: [],
      },
      editor: null,
    };
  },
});
