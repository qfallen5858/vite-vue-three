<template>
  <div class = "attr-list">
    <CommonAttr></CommonAttr>
    <el-form>
      <el-form-item label="内容">
        <el-input v-model="curComponent.propValue" type="textarea" :rows="3"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import CommonAttr from "@/components/custom-component/common/CommonAttr.vue";
import {mapState} from 'pinia'
import {indexStore} from "@/store"
export default defineComponent({
  components:{
    CommonAttr
  },
  computed:{
    ...mapState(indexStore, ['curComponent'])
  }

})
</script>