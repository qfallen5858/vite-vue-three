<script lang="ts">
import {defineComponent} from 'vue'
import {mapState} from 'pinia'
import {indexStore, composeStore} from '@/store/index'
export default defineComponent({
  computed:{
    ...mapState(indexStore,['canvasStyleData', 'componentData', 'curComponent', 'curComponentIndex']),
    ...mapState(composeStore,['areaData'])
  },
  data(){
    return{
      isShowPreview:false,
      isShowAceEditor:false,
      timer:null,
      isScreenshot:false,
      scale:100
    }
  }
})
</script>
<template>
  <div>
    <div class="toolbar">
      <el-button>JSON</el-button>
      <el-button>撤销</el-button>
      <el-button>重做</el-button>
      <label for="input" class="insert">
        插入图片
        <input id="input" hidden type="file" />
      </label>

      <el-button style="margin-left: 10px;">预览</el-button>
      <el-button>保存</el-button>
      <el-button>清空画布</el-button>
      <el-button>组合</el-button>
      <el-button>拆分</el-button>

      <el-button>锁定</el-button>
      <el-button>解锁</el-button>
      <el-button>截图</el-button>
      <div class="canvas-config">
        <span>画布大小</span>
        <input type="text" v-model="canvasStyleData.width">
        <span>*</span>
        <input type="text" v-model="canvasStyleData.height">
      </div>
      <div class="canvas-config">
        <span>画布比例</span>
        <input type="text" v-model="canvasStyleData.scale">
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.toolbar {
  padding: 15px 10px;
  white-space: nowrap;
  overflow-x: auto;
  background: #fff;
  border-bottom: 1px solid #ddd;

  .canvas-config {
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
    color: #606266;

    input {
      width: 50px;
      margin-left: 4px;
      outline: none;
      padding: 0 5px;
      border: 1px solid #ddd;
      color: #606266;
    }

    span {
      margin-left: 10px;
    }
  }
  .insert {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
        margin-left: 10px;

        &:active {
            color: #3a8ee6;
            border-color: #3a8ee6;
            outline: 0;
        }

        &:hover {
            background-color: #ecf5ff;
            color: #3a8ee6;
        }
    }
}

</style>