<template>
  <div class="shape">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { indexStore, composeStore } from '@/store/index'
import { string } from 'mathjs';
import { mod360 } from '@/utils/translate';
import { imageEmits } from 'element-plus';
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
    if(this.curComponent){
      this.cursors = this.getCursor();
    }
    // this.getCursor();
  },
  methods: {
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
<style lang="scss" scoped></style>