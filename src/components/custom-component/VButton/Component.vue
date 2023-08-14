<template>
  <button class="v-button">
    {{ propValue }}
  </button>
</template>
<script lang="ts">
import {defineComponent} from "vue"
import OnEvent from "../common/OnEvent.vue"
export default defineComponent({
  extends: OnEvent,
  props:{
    propValue:{
      type:String,
      default:''
    },
    element:{
      type:Object,
      default:()=>{}
    }
  },
  data(){
    return {}
  }
})
</script>
<style lang="scss" scoped>
.v-button{
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  // -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  width: 100%;
  height: 100%;
  font-size: 14px;

  &:active{
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
  }

  &:hover{
    color:#3a8ee6;
    border-color: #ecf5ff;
  }
}
</style>