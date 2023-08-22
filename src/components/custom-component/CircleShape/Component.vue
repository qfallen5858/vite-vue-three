<template>
  <div class="circle-shape">
    <v-text :prop-value="element.propValue" :element="element"></v-text>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import OnEvent from "../common/OnEvent.vue"
// import { default } from '../../../views/editor/index.vue';
export default defineComponent({
  extends: OnEvent,
  props:{
    propValue:{
      type:String,
      required: true,
      default:''
    },
    element:{
      type:Object,
      required:true,
      default:() => {}
    }
  }
})
</script>
<style lang="scss" scoped>
.circle-shape{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: auto;
}
</style>