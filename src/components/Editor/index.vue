<template>
  <div id="editor" class="editor" :class="{ edit: isEdit }" :style="editorStyle">
    <Grid/>
  </div>
</template>
<script>

import { getStyle, getComponentRotatedStyle, getShapeStyle, getSVGStyle, getCanvasStyle } from '@/utils/style'
import { $, isPreventDrop } from '@/utils/utils'
import { changeStyleWithScale } from '@/utils/translate'
import Grid from './Grid.vue'
import { mapState } from 'pinia'
import { indexStore, composeStore } from '@/store/index';
export default {
  computed: {
    ...mapState(indexStore, ['componentData', 'curComponent', 'canvasStyleData']),
    ...mapState(composeStore, ['editor']),
    editorStyle() {
      return { 
        ...getCanvasStyle(this.canvasStyleData), 
        width: changeStyleWithScale(this.canvasStyleData.width) + 'px', 
        height: changeStyleWithScale(this.canvasStyleData.height) + 'px' }
    }
  },
  components: {
    Grid
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
  }
}
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