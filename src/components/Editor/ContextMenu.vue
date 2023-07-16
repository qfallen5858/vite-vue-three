<template>
  <div class="contextmenu" v-show="menuShow" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }">
    <ul>
      <li>粘贴</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { indexStore, contextMenuStore } from '@/store/index';
import { mapState } from 'pinia'
export default defineComponent({
  computed: {
    ...mapState(contextMenuStore, ['menuShow', 'menuLeft', 'menuTop']),
    ...mapState(indexStore, ['curComponent'])
  },
  data() {
    return {

    }
  },
  methods: {

  }
})

</script>
<style lang="scss" scoped>
.contextmenu {
  position: absolute;
  z-index: 1000;

  ul {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 6px 0;

    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>

