<template>
  <div class="home">
    <Toolbar />

    <main>
      <section class="left">
        <ComponentList />
        <RealTimeComponentList />
      </section>
      <section class="center">
        <div class="content" 
          @drop="handleDrop" 
          @dragover="handleDropOver" 
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp">
          <Editor />
        </div>
      </section>
      <section class="right"></section>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Toolbar from 'component/Toolbar.vue'
import ComponentList from 'component/ComponentList.vue'
import RealTimeComponentList from 'component/RealTimeComponentList.vue'
import Editor from 'component/Editor/index.vue'
import bus from "@/utils/bus"
import { mapActions, mapState } from 'pinia'
import { indexStore, composeStore, contextMenuStore, snapshotStore } from '@/store/index'
import componentList from 'component/custom-component/component-list'
// import {LogMethod} from '@/utils/decorator'
import { deepCopy } from '../utils/utils';
import { generateUUID } from 'three/src/math/MathUtils'
import { changeComponentSizeWithScale } from '../utils/translate';
export default defineComponent({
  components: {
    Toolbar,
    ComponentList,
    RealTimeComponentList,
    Editor
  },
  data() {
    return {
      activeName: 'attr',
      reSelectAnimateIndex: undefined
    }
  },
  mounted() {
    // bus.on('test', (str) => {
    //   console.log(str + 'ok')
    // })
  },
  created() {
      this.restore();
  },
  computed: {
    ...mapState(indexStore, ['isClickComponent', 'curComponent', 'canvasStyleData']),
    ...mapState(composeStore, ['editor'])
  },

  methods: {
    ...mapActions(contextMenuStore, ['hideContextMenu']),
    ...mapActions(indexStore, ['setCurComponent', 'addComponent', 'setClickComponentStatus', 'setInEditorStatus']),
    ...mapActions(snapshotStore,['recordSnapshot']),

    restore(){

    },

    handleDrop(e:DragEvent) {
      // console.log("handedrop")
      e.preventDefault()
      e.stopPropagation()
      if(this.editor == null){
        return;
      }
      
      const index = e.dataTransfer.getData("index")
      const rectInfo = this.editor.getBoundingClientRect();
      if(index){
        const component = deepCopy(componentList[index])
        component.style.top = e.clientY - rectInfo.y
        component.style.left = e.clientX - rectInfo.x
        component.id = generateUUID()
        changeComponentSizeWithScale(component);
        this.addComponent(component)
        this.recordSnapshot();
      }
    },
    handleDropOver(e:DragEvent) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy"
    },
    handleMouseDown(e: MouseEvent) {
      e.stopPropagation();
      this.setInEditorStatus(false);
      this.setClickComponentStatus(false);
      

    },
    handleMouseUp(e: MouseEvent) {
      if (!this.isClickComponent) {
        this.setCurComponent(null, null);
      }
      if (e.button != 2) {
        this.hideContextMenu();
      }
    }

  }
}) 
</script>
<style lang="scss">
.home {
  height: 100vh;
  background: #fff;

  main {
    height: calc(100% - 64px);
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;

      &>div {
        overflow: auto;

        &:first-child {
          border-bottom: 1px solid #ddd;
        }
      }
    }

    .right {
      position: absolute;
      height: 100%;
      width: 288px;
      right: 0;
      top: 0;

      .el-select {
        width: 100%;
      }
    }

    .center {
      margin-left: 200px;
      margin-right: 288px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }

  .global-attr {
    padding: 10px;
  }
}
</style>