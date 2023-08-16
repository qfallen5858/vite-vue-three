<template>
  <div class="attr-list">
    <CommonAttr/>
    <el-form label="内容">
      <el-input v-model="curComponent.propValue" type="textarea" :rows="3"></el-input>
    </el-form>
  </div>
</template>
<script lang="ts">
import CommonAttr from '../common/CommonAttr.vue';
import {defineComponent} from "vue"
import {mapState} from 'pinia'
import {indexStore} from "@/store"
export default defineComponent({
  components:{CommonAttr},
  computed:{
    ...mapState(indexStore, ['curComponent'])
  }
})
</script>