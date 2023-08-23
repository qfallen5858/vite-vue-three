<template>
  <div class="attr-list">
    <CommonAttr/>
  </div>
</template>
<script lang="ts">
import CommonAttr from "../common/CommonAttr.vue"
import {defineComponent} from "vue"
export default defineComponent({
  components:{CommonAttr}
})
</script>