<template>
  <div class="line-shape">
  </div>
</template>
<script lang="ts">
import OnEvent from '../common/OnEvent.vue';
import {defineComponent} from 'vue'
export default defineComponent({
  extends:OnEvent
})
</script>
<style lang="scss" scoped>
.line-shape{
  width: 100%;
  height: 100;
  overflow: auto;
}
</style>