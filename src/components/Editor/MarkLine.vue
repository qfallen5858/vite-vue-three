<template>
  <div class="mark-line">
    <div v-for="(line, index) in lines" v-show="lineStatus['line'] || false" :key="index" class="line" ref="line"
      :class="line.includes('x') ? 'xline' : 'yline'"></div>
  </div>
</template>
<script lang="ts">
import bus from "@/utils/bus"
import { defineComponent } from "vue"
import { mapState, mapActions } from "pinia"
import { indexStore } from "@/store"
import { getComponentRotatedStyle } from "@/utils/style"
type LineGroup = 'xt' | 'xc' | 'xb' | 'yl' | 'yc' | 'yr'
type KeyGroups = 'top' | 'left'
type Condtion = {
  isNearly: boolean,
  lineNode: any,
  line: LineGroup,
  dragShift: number,
  lineShift: number
}
type TopLeftConditions = Record<KeyGroups, Condtion[]>


export default defineComponent({
  data() {
    return {
      lines: ['xt', 'xc', 'xb', 'yl', 'yc', 'yr'] as string[],
      tolerance: 3 as number,
      lineStatus: {
        xt: false,
        xc: false,
        xb: false,
        yl: false,
        yc: false,
        yr: false
      }
    }
  },
  mounted() {
    bus.on("move", ({ isDownward, isRightward }) => {
      this.showLine(isDownward, isRightward)
    })
    bus.on("unmove", () => {
      this.hideLine()
    })

  },
  computed: {
    ...mapState(indexStore, ['componentData', 'curComponent'])
  },
  methods: {
    ...mapActions(indexStore, ['setShapeSingleStyle']),
    hideLine(): void {
      Object.keys(this.lineStatus).forEach(line => {
        this.lineStatus[line] = false
      })
    },
    showLine(isDownward: boolean, isRightward: boolean) {
      const lines = this.$refs
      const components = this.componentData
      const curComponentStyle = getComponentRotatedStyle(this.curComponent.style)
      const curComponentHalfWidth: number = curComponentStyle.width / 2
      const curComponentHalfHeight: number = curComponentStyle.height / 2

      this.hideLine()

      components.forEach(component => {
        if (component == this.curComponent) return

        const componentStyle = getComponentRotatedStyle(component.style)
        const { top, left, bottom, right } = componentStyle;
        const componentHalfWidth = componentStyle.width / 2
        const componentHalfHeight = componentStyle.height / 2

        const conditions: TopLeftConditions = {
          top: [
            {
              isNearly: this.isNearly(curComponentStyle.top, top),//选中元素和当前元素top靠近
              lineNode: lines.xt[0],
              line: "xt",
              dragShift: top,//元素移动
              lineShift: top,//辅助线移动
            },
            {
              isNearly: this.isNearly(curComponentStyle.bottom, top),//底部和当前元素top靠近
              lineNode: lines.xt[0],
              line: 'xt',
              dragShift: top - curComponentStyle.height, //选中元素的底部跟当前元素的top对齐,
              lineShift: top
            },
            {
              //中部对齐
              isNearly: this.isNearly(curComponentStyle.top + curComponentHalfHeight, top + componentHalfHeight),
              lineNode: lines.xc[0],
              line: 'xc',
              dragShift: top + componentHalfHeight - curComponentHalfHeight,
              lineShift: top + componentHalfHeight
            },
            {
              isNearly: this.isNearly(curComponentStyle.top, bottom),
              lineNode: lines.xb[0],
              line: 'xb',
              dragShift: bottom,
              lineShift: bottom
            },
            {
              isNearly: this.isNearly(curComponentStyle.bottom, bottom),
              lineNode: lines.xb[0],
              line: 'xb',
              dragShift: bottom - curComponentStyle.height,
              lineShift: bottom
            }
          ],
          left: [
            {
              //左左对齐
              isNearly: this.isNearly(curComponentStyle.left, left),
              lineNode: lines.yl[0],
              line: 'yl',
              dragShift: left,
              lineShift: left
            },
            {
              //右左对齐
              isNearly: this.isNearly(curComponentStyle.right, left),
              lineNode: lines.yl[0],
              line: 'yl',
              dragShift: left - curComponentStyle.width,
              lineShift: left
            },
            {
              //中中对齐
              isNearly: this.isNearly(curComponentStyle.left + curComponentHalfWidth, left + componentHalfWidth),
              lineNode: lines.yc[0],
              line: 'yc',
              dragShift: left + componentHalfWidth - curComponentHalfWidth,
              lineShift: left
            },
            {
              //左右对齐
              isNearly: this.isNearly(curComponentStyle.left, right),
              lineNode: lines.yr[0],
              line: 'yr',
              dragShift: right,
              lineShift: right
            },
            {
              //右右对齐
              isNearly: this.isNearly(curComponentStyle.right, right),
              lineNode: lines.yr[0],
              line: 'yr',
              dragShift: right - curComponentStyle.width,
              lineShift: right
            }

          ]
        }

        const needToShow: string[] = []
        const { rotate } = this.curComponent.style;
        Object.keys(conditions).forEach(key => {
          conditions[key].forEach((condition) => {
            if (!condition.isNearly) return
            //先移动选中对象
            this.setShapeSingleStyle({
              key,
              value: rotate != 0 ? this.translatecurComponentShift(key, condition.dragShift, curComponentStyle) : condition.dragShift
            })
            //在移动辅助线
            condition.lineNode.style[key] = `${condition.lineShift}px`
            needToShow.push(condition.line)
          })
        })

        if (needToShow.length) {
          this.chooseLine(needToShow, isDownward, isRightward)
        }
      })

    },

    //这里的curComponentStyle会根据是否旋转计算
    translatecurComponentShift(key: string, dragShift: number, curComponentStyle: any) {
      const { width, height } = this.curComponent.style
      if (key == 'top') {
        return Math.round(dragShift - (height - curComponentStyle.height) / 2)
      } else {
        return Math.round(dragShift - (width - curComponentStyle.width) / 2)
      }
    },

    chooseLine(needToShow: string[], isDownward: boolean, isRightward: boolean): void {
      //按顺序显示
      let lineArr: string[] = []
      if (isRightward) {
        lineArr = ['yr', 'yc', 'yl']
      } else {
        lineArr = ['yl', 'yc', 'yr']
      }
      for (let item of lineArr) {
        if (needToShow.includes(item)) {
          this.lineStatus[item] = true;
          break;
        }
      }
      if (isDownward) {
        lineArr = ['xb', 'xc', 'xt']
      } else {
        lineArr = ['xt', 'xc', 'xb']
      }
      for (let item of lineArr) {
        if (needToShow.includes(item)) {
          this.lineStatus[item] = true;
          break;
        }
      }
    },

    isNearly(value: number, compareValue: number): boolean {
      return Math.abs(value - compareValue) < this.tolerance
    }

  }

})
</script>
<style lang="scss" scoped>
.mark-line {
  height: 100%;
}

.line {
  background: #59c7f9;
  position: absolute;
  z-index: 1000;
}

.xline {
  width: 100%;
  height: 1px;
}

.yline {
  width: 1px;
  height: 100%;
}
</style>