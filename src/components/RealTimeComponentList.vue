<template>
  <div class="real-time-component-list">
    <div v-for="(item, index) in componentData" :key="index" class="list" 
      :class="{active: transformIndex(index) === curComponentIndex}" @click="onClick(transformIndex(index))"
    >
      <span class="iconfont" :class="'icon-' + getComponent(index).icon"></span>
      <span>{{ getComponent(index).label }}</span>
      <div class="icon-container">
        <span class="iconfont icon-shangyi" @click="onUpComponent()"></span>
        <span class="iconfont icon-xiayi" @click="onDownComponent()"></span>
        <span class="iconfont icon-shanchu" @click="onDeleteComponent()"></span>
      </div>
    </div>

  </div>
</template>

<script lang="ts">

import { mapState, mapActions } from 'pinia'
import { indexStore, layerStore, snapshotStore } from '@/store/index';
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    ...mapState(indexStore,['componentData',
      'curComponent',
      'curComponentIndex'])
  },
  methods:{
    ...mapActions(indexStore, ['setCurComponent', 'deleteComponent']),
    ...mapActions(snapshotStore, ['recordSnapshot']),
    ...mapActions(layerStore, ['upComponent', 'downComponent']),
    getComponent(index:number){
      return this.componentData[this.componentData.length - 1 - index]
    },

    transformIndex(index:number):number{
      return this.componentData.length - 1 - index
    },

    onClick(index:number){
      this.setCurComponentByIndex(index)
    },
    setCurComponentByIndex(index:number){
      this.setCurComponent(this.componentData[index], index)
    },
    onDeleteComponent(){
      setTimeout(() => {
        this.deleteComponent()
        this.recordSnapshot() 
      });
    },
    onUpComponent(){
      setTimeout(() => {
        this.upComponent()
        this.recordSnapshot() 
      });
    },
    onDownComponent(){
      setTimeout(() => {
        this.downComponent()
        this.recordSnapshot() 
      });
    }

  }
}) 


</script>
<style lang="scss" scoped>
.real-time-component-list {
  height: 35%;

  .list {
    height: 30px;
    cursor: grab;
    text-align: center;
    color: #333;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0 10px;
    position: relative;
    user-select: none;

    &:active {
      cursor: grabbing;
    }

    &:hover {
      background-color: rgba(200, 200, 200, .2);

      .icon-container {
        display: block;
      }
    }

    .iconfont {
      margin-right: 4px;
      font-size: 16px;
    }

    .icon-wenben,
    .icon-tupian {
      font-size: 14px;
    }

    .icon-container {
      position: absolute;
      right: 10px;
      display: none;

      .iconfont {
        cursor: pointer;
      }
    }
  }

  .actived {
    background: #ecf5ff;
    color: #409eff;
  }
}
</style>