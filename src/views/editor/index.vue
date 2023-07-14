<template>
  <div style="height: 100%;width: 100%;">
    <el-container style="height:100%; width:100%;">
      <el-aside width="20%">
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
        <View3d/>
        <!-- <div id="floorplanner" ref="floorplannerDiv">
          <canvas id="floorplanner-canvas" ref="floorplannerCanvas"></canvas>
        </div> -->
      </el-main>
    </el-container>
  </div>
</template>

<!-- <script setup lang="ts">
import { ref, onMounted, getCurrentInstance, ComponentInternalInstance } from "vue";
import {Floorplanner} from '../../libs/floorplanner/floorplanner';
import {Designer} from '../../libs/design2d/designer'

const floorplannerDiv = ref(null);
const floorplannerCanvas = ref(null);
const init = () => {
  // if (floorplannerCanvas.value && floorplannerDiv.value) {
  // floorplannerDiv.value!.style.height = (window.innerHeight - floorplannerDiv.value!.offsetTop * 2) + 'px'
  // }
  new Designer("floorplanner-canvas");
}

onMounted(init);
</script> -->

<script lang="ts">
import View3d from "component/Viewer3d.vue"
import {Floorplanner} from '../../libs/floorplanner/floorplanner';
import {Designer} from '../../libs/design2d/designer'
export default{
  components:{
    View3d
  },
  data(){
    return {
      floorPlannerDiv: undefined,
      floorPlannerCanvas:undefined
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      // new Designer("floorplanner-canvas")
    }
  }

}
</script>


<style>
</style>
