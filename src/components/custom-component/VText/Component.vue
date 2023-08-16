<template>
  <div v-if="editMode == 'edit'" class="v-text" @keydown="handleKeyDown" @keyup="handleKeyUp">
    <div ref="text" 
    :contenteditable="canEdit" 
    :class="{ 'can-edit': canEdit }"
    :style="{verticalAlign:element.style.verticalAlign}"
    @dblclick="setEdit"
    @mousedown="handleMouseDown"
    @input="handleInput"
    v-html="element.propValue"

    ></div>
  </div>
  <div v-else class="v-text preview">
        <div :style="{ verticalAlign: element.style.verticalAlign }" v-html="element.propValue"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OnEvent from '../common/OnEvent.vue';
import { mapState } from 'pinia'
import bus from "@/utils/bus"
import { indexStore } from "@/store"
const CtrlKey: string = "17"
import { KeyCodes } from "@/utils/shortcutKey"

export default defineComponent({
  extends: OnEvent,
  props: {
    propValue: {
      type: String,
      required: true,
      default: ''
    },
    request: {
      type: Object,
      default: () => { }
    },
    element: {
      type: Object,
      default: () => { }
    },
    linkage: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    ...mapState(indexStore, ['editMode', 'curComponent'])
  },
  
  created() {
    // console.log('created')
    bus.on('componentClick', this.onComponentClick)
  },
  beforeUnmount() {
    bus.off('componentClick', this.onComponentClick)
  },
  data() {
    return {
      canEdit: false,
      isCtrlDown: false,
      cancelRequest: null
    }
  },
  methods: {
    onComponentClick() {
      if (this.curComponent.id !== this.element.id) {
        this.canEdit = false
      }
    },
    handleKeyDown(e: KeyboardEvent) {
      this.canEdit && e.stopPropagation()
      if (e.code == CtrlKey) {
        this.isCtrlDown = true
      } else if (this.isCtrlDown && this.canEdit && KeyCodes.includes(e.code)) {
        e.stopPropagation()
      } else if (e.code == "46") {
        e.stopPropagation()
      }
    },
    handleKeyUp(e: KeyboardEvent) {
      this.canEdit && e.stopPropagation()
      if (e.code == CtrlKey) {
        this.isCtrlDown = false
      }
    },
    handleMouseDown(e: MouseEvent) {
      this.canEdit && e.stopPropagation()
    },
    handleInput(e:Event){
      this.$emit('input', this.element, (e.target as Element).innerHTML)
    },
    setEdit() {
      if (this.element.isLock) {
        return;
      }
      this.canEdit = true;
      this.selectText(this.$refs.text)
    },
    selectText(element: any) {
      const selection: Selection = window.getSelection()
      const range: Range = document.createRange()
      range.selectNodeContents(element)
      selection.removeAllRanges();
      selection.addRange(range)
    }
  }
})
</script>
<style lang="scss" scoped>
.v-text {
  width: 100%;
  height: 100%;
  display: table;

  div {
    display: table-cell;
    width: 100%;
    height: 100%;
    outline: none;
    word-break: break-all;
    padding: 4px;
  }

  .can-edit {
    cursor: text;
    height: 100%;
  }
}

.preview {
  user-select: none;
}
</style>