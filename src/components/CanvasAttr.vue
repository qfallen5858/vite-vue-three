<template>
  <div class="attr-container">
    <p class="title">画布属性</p>
    <el-form style="padding: 20px;">
      <el-form-item v-for="(key, index) in Object.keys(options)" :key="index" :label="options[key]">
        <el-color-picker v-if="isIncludesColor(key)" v-model="canvasStyleData[key]" show-alpha></el-color-picker>
        <el-input v-else v-model.number="canvasStyleData[key]" type="number"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue"
import {mapState} from "pinia"
import {indexStore} from "@/store"

export default defineComponent({
  data(){
    return {
      options:{
        color:'颜色',
        opacity:'不透明度',
        backgroundColor:'背景色',
        fontSize:'字体大小'
      }
    }
  },
  computed:{
    ...mapState(indexStore, ["canvasStyleData"])
  },
  methods:{
    isIncludesColor(str:string):boolean{
      return str.toLowerCase().includes('color');
    }
  }
})
</script>
<style lang="scss" scoped>
.attr-container{

}
</style>