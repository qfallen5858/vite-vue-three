<template>
  <!-- <n-space vertical size="large">
    <n-layout has-sider>
      <n-layout-sider collapse-mode="transform" :collapsed-width="120" :width="240" show-trigger="bar"
        content-style="padding:24px" bordered>
        <n-collapse>
          <n-collapse-item title="Edit FloorPlan" name="1">
            <div>test</div>
          </n-collapse-item>
          <n-collapse-item title="Design" name="2">
            <div>test</div>
          </n-collapse-item>
          <n-collapse-item title="Add Items" name="3">
            <div>test</div>
          </n-collapse-item>
        </n-collapse>
      </n-layout-sider>
      <n-layout-content content-style="height:100%">
        <div id="floorplanner">
          <canvas id="floorplanner-canvas"></canvas>
        </div>
      </n-layout-content>
    </n-layout>
  </n-space> -->

  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-collapse accordion>
          <el-collapse-item title="指标库" name="1">
            <div>test</div>
          </el-collapse-item>
          <el-collapse-item title="Design" name="2">
            <div>test</div>
          </el-collapse-item>
          <el-collapse-item title="Add Items" name="3">
            <div>test</div>
          </el-collapse-item>
        </el-collapse>
      </el-aside>
      <el-main>
        <div id="floorplanner" ref="floorplannerDiv">
          <canvas id="floorplanner-canvas" ref="floorplannerCanvas"></canvas>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, ComponentInternalInstance } from "vue";
import {Floorplanner} from '../../libs/floorplanner/floorplanner';
import {Designer} from '../../libs/design2d/designer'
const floorplannerDiv = ref(null);
const floorplannerCanvas = ref(null);
const init = () => {
  // if (floorplannerCanvas.value && floorplannerDiv.value) {
  floorplannerDiv.value!.style.height = (window.innerHeight - floorplannerDiv.value!.offsetTop * 2) + 'px'
  // }
  new Designer("floorplanner-canvas");
}

onMounted(init);
</script>

<style>
</style>
