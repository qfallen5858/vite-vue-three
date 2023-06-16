<template>
  <div style="height: 100%;width: 100%;">
    <View3d/>
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
import View3d from "comps/Viewer3d.vue"
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
