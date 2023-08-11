<template>
  <div class="container">
    <h1>helloworld</h1>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  data(){
    return {}
  },
  created() {
      console.log("created")
  },
})
</script>
<style lang="scss" scoped>
.container{
  width: 200px;
  height: 100px;
  background-color: red;
}

</style>