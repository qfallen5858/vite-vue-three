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
    };
  },
  actions: {
    aceSetCanvasData(value: StyleData) {
      this.canvasStyleData = value;
    },
  },
});
