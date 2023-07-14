<template>
  <div class="real-time-component-list">
    <div v-for="(item, index) in componentData" :key="index" class="list">

    </div>

  </div>
</template>

<script>

import { mapState } from 'pinia'
import { indexStore } from '@/store/index';

export default {
  computed: {
    ...mapState(indexStore,['componentData',
      'curComponent',
      'curComponentIndex'])
  }
}


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