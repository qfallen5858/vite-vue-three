<template>
  <div id="three-container" style="display: block;">
    <div id="main-controls">
      <el-button>新建</el-button>
      <el-button>保存</el-button>
      <el-button>载入</el-button>
    </div>
    
    <div id="camera-controls">
      <el-button ><el-icon><ZoomOut/></el-icon></el-button>
      <el-button ><el-icon><HomeFilled/></el-icon></el-button>
      <el-button ><el-icon><ZoomIn/></el-icon></el-button>
      
      
      <span>&nbsp;</span>
      <el-button ><el-icon><ArrowLeft/></el-icon></el-button>
      <span class="btn-group-vertical">
        <el-button class="btn"><el-icon><ArrowUp/></el-icon></el-button>
        <el-button class="btn"><el-icon><ArrowDown/></el-icon></el-button>
      </span>
      

      <el-button ><el-icon><ArrowRight/></el-icon></el-button>
      
    </div>
  </div>
</template>

<script lang="ts">
import {Main} from "./../libs/three/main"
export default{
  data() { return {}},
  mounted(){
    new Main();
   },
  methods:{}
}
</script>

<style scoped>
#viewer {
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
}
#main-controls{
  position: absolute;
  top: 20px;
  left:20px;
  padding: 0;
}

#camera-controls{
  position: absolute;
  bottom: 20px;
  right: 0px;
  padding: 0 20px;
  text-align:right
}

.btn-group-vertical {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}

.btn-group-vertical .btn{
  position: relative;
  float: left;
}

.btn-group-vertical .btn{
  display: block;
  float: none;
  width: 100%;
  max-width: 100%;
}

.el-button+.el-button{
  margin-left: 0px;
}

</style>