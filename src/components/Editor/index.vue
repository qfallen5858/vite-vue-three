<template>
  <div id="editor" class="editor" :class="{ edit: isEdit }" :style="editorStyle" @contextmenu="handleContextMenu"
    @mousedown="handleMouseDown">
    <Grid />

    <Shape v-for="(item, index) in componentData" :key="item.id" :index="index
      " :default-style="item.style" :style="getShapeStyle(item.style)" :active="item.id === (curComponent || {}).id"
      :element="item" :class="{ isLock: item.isLock }">
      <component :is="item.component" v-if="item.component.startsWith('SVG')" :id="'component ' + item.id" class="component"
      :style="getSVGStyle(item.style)" :propValue="item.propValue" :element="item" :request="item.request"></component>
      <component :is="item.component" v-else-if="item.component != 'VText'" :id="'component ' + item.id" class="component"
        :style="getComponentStyle(item.style)" :propValue="item.propValue" :element="item" :request="item.request">
      </component>
      <component 
        :is="item.component" 
        v-else 
        :id="'component ' + item.id" 
        class="component"
        :style="getComponentStyle(item.style)" 
        :propValue="item.propValue" 
        :element="item" 
        :request="item.request"
        @input="handleInput"
        >
      </component>
      <!-- <component is="VTest"></component> -->
    </Shape>

    <ContextMenu />
  </div>
</template>
<script lang="ts">
import { getStyle, getComponentRotatedStyle, getShapeStyle, getSVGStyle, getCanvasStyle } from '@/utils/style'
import { $, isPreventDrop } from '@/utils/utils'
import { changeStyleWithScale } from '@/utils/translate'
import Grid from './Grid.vue'
import ContextMenu from './ContextMenu.vue'
import Shape from './Shape.vue'
import { mapState, mapActions } from 'pinia'
import { indexStore, composeStore, contextMenuStore } from '@/store/index';
import { defineComponent } from 'vue'

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
    ContextMenu,
    Shape
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
  mounted() {
    this.getEditor();
    // bus.emit("test", "test")
  },
  methods: {
    ...mapActions(contextMenuStore, ["showContextMenu"]),
    ...mapActions(composeStore, ['getEditor', 'setAreaData']),
    getShapeStyle,getSVGStyle,
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
      if (!this.curComponent || (isPreventDrop(this.curComponent.component))) {
        e.preventDefault()
      }

      this.hideArea()

      const rectInfo = this.editor.getBoundingClientRect();
      this.editorX = rectInfo.x
      this.editorY  = rectInfo.y
      
      const startX = e.clientX
      const startY = e.clientY

      this.start.x = startX - this.editorX
      this.start.y = startY - this.editorY

      this.isShowArea = true

      const move = (moveEvent:MouseEvent) =>{
        this.width = Math.abs(moveEvent.clientX - startX)
        this.height = Math.abs(moveEvent.clientY - startY)
        if(moveEvent.clientX < startX){
          this.start.x = moveEvent.clientX - this.editX
        }
        if(moveEvent.clientY < startY){
          this.start.y = moveEvent.clientY - this.editY
        }
      }
      const up = (moveEvent:MouseEvent) =>{
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)

        if(moveEvent.clientX == startX && moveEvent.clientY == startY){
          this.hideArea()
          return
        }

        // this.createGroup();
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)

    },
    handleInput(){

    },
    hideArea() {
      this.isShowArea = false;
      this.width = 0;
      this.height = 0;

      this.setAreaData({
        style: {
          left: 0, top: 0, width: 0, height: 0
        },
        components: []
      })
    },
    getComponentStyle(style: any) {
      const componentStyle = getStyle(style, this.svgFilterAttrs)
      // console.log(componentStyle)
      return componentStyle
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