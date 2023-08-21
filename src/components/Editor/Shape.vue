<template>
  <div class="shape" :class="{ active }" @click="selectCurComponent" @mousedown="handleMouseDownOnShape">
    <span v-show="isActive()" class="iconfont icon-xiangyouxuanzhuan" @mousedown="handleRotate"></span>
    <span v-show="element.isLock" class="iconfont icon-suo"></span>
    <div v-for="(item, index) in (isActive() ? getPointList() : [])" :key="index" class="shape-point"
      :style="getPointStyle(item)" @mousedown="handleMouseDownOnPoint(item, $event)">
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { indexStore, composeStore, contextMenuStore, snapshotStore } from '@/store/index'
import { mod360 } from '@/utils/translate';
import {isPreventDrop} from "@/utils/utils"
import bus from "@/utils/bus"
const pointListForShape: string[] = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'];
const pointListForLine: string[] = ['l', 'r']
const initialAngle = {
  lt: 0,
  t: 45,
  rt: 90,
  r: 145,
  rb: 180,
  b: 235,
  lb: 270,
  l: 315,
}

const angleToCursor = [
  { start: 338, end: 23, cursor: 'nw' },
  { start: 23, end: 68, cursor: 'n' },
  { start: 68, end: 113, cursor: 'ne' },
  { start: 113, end: 158, cursor: 'e' },
  { start: 158, end: 203, cursor: 'se' },
  { start: 203, end: 248, cursor: 's' },
  { start: 248, end: 293, cursor: 'sw' },
  { start: 293, end: 338, cursor: 'w' },
]

export default defineComponent({
  props: {
    active: {
      type: Boolean,
      default: false
    },
    element: {
      required: true,
      type: Object,
      default: () => { }
    },
    defaultStyle: {
      required: true,
      type: Object,
      default: () => { }
    },
    index: {
      required: true,
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      cursors: {}
    }
  },
  computed: {
    ...mapState(indexStore, ['curComponent']),
    ...mapState(composeStore, ['editor'])
  },
  mounted() {
    if (this.curComponent) {
      this.cursors = this.getCursor();
    }
    // this.getCursor();
  },
  methods: {
    ...mapActions(contextMenuStore, ['hideContextMenu']),
    ...mapActions(indexStore, ['setClickComponentStatus', 'setCurComponent', 'setShapeStyle', 'setInEditorStatus']),
    ...mapActions(snapshotStore, ['recordSnapshot']),
    selectCurComponent(e: MouseEvent) {
      e.stopPropagation();
      e.preventDefault();
      this.hideContextMenu();
    },
    handleRotate(e: MouseEvent) {
      this.setClickComponentStatus(true);
      e.preventDefault();
      e.stopPropagation();
      const pos = { ...this.defaultStyle }
      const startX = e.clientX;
      const startY = e.clientY;
      const startRotate = pos.rotate;

      const rect = this.$el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const rotateDegreeBefore: number = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180)

      let hasMove: boolean = false;
      const self = this;
      const move = (moveEvent: MouseEvent) => {
        hasMove = true;
        const curX = moveEvent.clientX;
        const curY = moveEvent.clientY;
        const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180)
        pos.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore
        self.setShapeStyle(pos)
      }

      const up = (moveEvent: MouseEvent) => {
        hasMove && self.recordSnapshot()
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        self.cursors = self.getCursor()
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)

    },

    handleMouseDownOnShape(e: MouseEvent) {
      this.$nextTick(()=>{bus.emit('componentClick')})
      this.setInEditorStatus(true)
      this.setClickComponentStatus(true)

      if(isPreventDrop(this.element.component)){
        e.preventDefault()
      }
      e.stopPropagation()

      this.setCurComponent(this.element, this.index)
      if(this.element.isLock){
        return;
      }

      this.cursors = this.getCursor()

      const pos = {...this.defaultStyle};
      const startX = e.clientX
      const startY = e.clientY

      const startTop = Number(pos.top)
      const startLeft = Number(pos.left)

      let hasMove = false;

      const move = (moveEvent:MouseEvent) => {
        hasMove = true;
        const curX = moveEvent.clientX;
        const curY = moveEvent.clientY;
        pos.top = curY - startY + startTop
        pos.left = curX - startX + startLeft

        this.setShapeStyle(pos)
        this.$nextTick(() => {
          bus.emit('move', {isDownward:curY - startY > 0, isRightward:curX - startX > 0})
        })
      }

      const up = (moveEvent:MouseEvent) => {
        hasMove && this.recordSnapshot()
        bus.emit('unmove')
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },

    handleMouseDownOnPoint(item, e: MouseEvent) {

    },
    getPointStyle(point: string) {
      const width = this.defaultStyle.width;
      const height = this.defaultStyle.height;
      // const { width, height } = this.defautStyle;
      const hasTop: boolean = /t/.test(point)
      const hasBottom: boolean = /b/.test(point)
      const hasLeft: boolean = /l/.test(point)
      const hasRight: boolean = /r/.test(point)
      let left: number = 0, top: number = 0;
      if (point.length === 2) {
        left = hasLeft ? 0 : width;
        top = hasTop ? 0 : height;
      } else {
        if (hasTop || hasBottom) {
          left = width / 2
          top = hasTop ? 0 : height
        }

        if (hasLeft || hasRight) {
          top = height / 2
          left = hasLeft ? 0 : width
        }
      }

      const style = {
        marginLeft: '-4px',
        marginTop: '-4px',
        cursor: this.cursors[point],
        left: `${left}px`,
        top: `${top}px`
      }
      return style
    },


    isActive(): boolean {
      return this.active && !this.element?.isLock;
    },
    getPointList(): string[] {
      if (this.element?.component === 'line-shape') {
        return pointListForLine
      } else {
        return pointListForShape
      }
    },
    getCursor() {
      const rotate = this.curComponent.style.rotate;
      const result = {}
      let lastMatchIndex = -1 // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度
      const pointList = this.getPointList();
      pointList.forEach(point => {
        const angle = mod360(initialAngle[point] + rotate)
        const len = angleToCursor.length
        // eslint-disable-next-line no-constant-condition
        while (true) {
          lastMatchIndex = (lastMatchIndex + 1) % len
          const angleLimit = angleToCursor[lastMatchIndex]
          if (angle < 23 || angle >= 338) {
            result[point] = 'nw-resize'

            return
          }

          if (angleLimit.start <= angle && angle < angleLimit.end) {
            result[point] = angleLimit.cursor + '-resize'

            return
          }
        }
      })

      return result
    }
  }

})

</script>
<style lang="scss" scoped>
.shape {
  position: absolute;

  &:hover {
    cursor: move;
  }
}

.active {
  outline: 1px solid #70c0ff;
  user-select: none;
}

.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}

.icon-xiangyouxuanzhuan {
  position: absolute;
  top: -34px;
  left: 50%;
  transform: translateX(-50%);
  cursor: grab;
  color: #59c759;
  font-size: 20px;
  font-weight: 600;

  &:active {
    cursor: grabbing;
  }
}

.icon-suo {
  position: absolute;
  top: 0;
  right: 0;
}
</style>