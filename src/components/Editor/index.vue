<template>
  <div id="editor" class="editor" :class="{ edit: isEdit }" :style="editorStyle" @contextmenu="handleContextMenu"
    @mousedown="handleMouseDown">
    <Grid />

    <ContextMenu />
  </div>
</template>
<script lang="ts">
import { getStyle, getComponentRotatedStyle, getShapeStyle, getSVGStyle, getCanvasStyle } from '@/utils/style'
import { $, isPreventDrop } from '@/utils/utils'
import { changeStyleWithScale } from '@/utils/translate'
import Grid from './Grid.vue'
import ContextMenu from './ContextMenu.vue'
import { mapState, mapActions } from 'pinia'
import { indexStore, composeStore, contextMenuStore } from '@/store/index';
import { defineComponent } from 'vue'
import bus from "@/utils/bus"

export default defineComponent({
  computed: {
    ...mapState(indexStore, ['componentData', 'curComponent', 'canvasStyleData']),
    ...mapState(composeStore, ['editor']),
    editorStyle() {
      return {
        ...getCanvasStyle(this.canvasStyleData),
        width: changeStyleWithScale(this.canvasStyleData.width) + 'px',
        height: changeStyleWithScale(this.canvasStyleData.height) + 'px'
      }
    }
  },
  components: {
    Grid,
    ContextMenu
  },
  props: {
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      editorX: 0,
      editorY: 0,
      start: { // 选中区域的起点
        x: 0,
        y: 0,
      },
      width: 0,
      height: 0,
      isShowArea: false,
      svgFilterAttrs: ['width', 'height', 'top', 'left', 'rotate'],
    }
  },
  mounted(){
    this.getEditor();
    bus.emit("test", "test")
  },
  methods: {
    ...mapActions(contextMenuStore, ["showContextMenu"]),
    ...mapActions(composeStore, ['getEditor']),
    handleContextMenu(e: MouseEvent) {
      e.stopPropagation();
      e.preventDefault();
      let target = e.target as HTMLElement | null;
      let top = e.offsetY;
      let left = e.offsetX;
      while (target && target instanceof SVGElement) {
        target = target.parentElement
      }
      while (target && !target.className?.includes('editor')) {
        left += target.offsetLeft;
        top += target.offsetTop;
        target = target.parentElement;
      }
      this.showContextMenu(left, top);
    },

    handleMouseDown(e: MouseEvent) {
      // this.hideContextMenu();
    }
  }
})
</script>
<style lang="scss" scoped>
.editor {
  position: relative;
  background: #fff;
  margin: auto;

  .lock {
    opacity: .5;

    &:hover {
      cursor: not-allowed;
    }
  }
}

.edit {
  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}
</style>