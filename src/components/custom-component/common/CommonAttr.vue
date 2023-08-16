<template>
  <div class="v-common-attr">
    <el-collapse v-model="activeName" accordion @change="onChange">
      <el-collapse-item title="通用样式" name="style">
        <el-form>
          <el-form-item v-for="({key, label}, index) in styleKeys" :key="index" :label="label">
            <el-color-picker v-if="isIncludeColor(key)" v-model="curComponent.style[key]" show-alpha></el-color-picker>
            <el-select v-else-if="selectKey.includes(key)" v-model="curComponent.style[key]">
              <el-option v-for="item in optionMap[key]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-input v-else v-model.number="curComponent.style[key]" type="number"></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import {mapState} from 'pinia'
import { indexStore } from '@/store'
import {styleData, textAlignOptions, borderStyleOptions, verticalAlignOptions, selectKey, optionMap} from '@/utils/attr'
export default defineComponent({
  data() {
    return {
      optionMap,
      styleData,
      textAlignOptions,
      borderStyleOptions,
      verticalAlignOptions,
      selectKey,
      activeName:''
    }
  },
  computed:{
    ...mapState(indexStore, ['curComponent']),
    styleKeys(){
      if(this.curComponent){
        const curStyleKeys = Object.keys(this.curComponent.style);
        return this.styleData.filter(item => curStyleKeys.includes(item.key));
      }
      return []
    }
  },
  created(){
    this.activeName = this.curComponent.collapseName;
  },
  methods:{
    onChange():void{
      this.curComponent.collapseName = this.activeName;
    },

    isIncludeColor(str:string):boolean{
      return str.toLowerCase().includes('color');
    }
  }
})
</script>

<style lang="scss">
.v-common-attr {
  .el-input_group__prepend {
    padding: 0 10px;
  }
}
</style>