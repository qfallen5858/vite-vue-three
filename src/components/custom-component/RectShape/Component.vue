<template>
  <div class="rect-shape">
    <v-text :prop-value="element.propValue" :element="element"></v-text>
  </div>
</template>

<script lang="ts">
import OnEvent from "../common/OnEvent.vue"
import {defineComponent} from "vue"

export default defineComponent({
  extends:OnEvent,
  props:{
    propValue:{
      type:String,
      required: true,
      default: ''
    },
    element:{
      type:Object,
      default:()=>{}
    }
  }
})
</script>

<style lang="scss" scoped>
.rect-shape{
  width:100%;
  height: 100%;
  overflow: auto;
}
</style>