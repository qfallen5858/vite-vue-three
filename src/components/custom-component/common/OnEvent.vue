<script lang="ts">
import {defineComponent} from 'vue'
import bus from "@/utils/bus.ts"
export default defineComponent({
  props:{
    linkage:{
      type:Object,
      default: () => {}
    },
    element:{
      type:Object,
      default:() => {}
    }
  },
  created(){
    if(this.linkage?.data?.length){
      bus.on('v-click', this.onClick)
      bus.on('v-hover', this.onHover)
    }
  },
  mounted(){
    const {data, duration} = this.linkage || {}
    if(data?.length){
      this.$el.style.transition = `all ${duration}s`
    }
  },
  beforeUnmount() {
    bus.off('v-click', this.onClick)
    bus.off('v-hover', this.onHover)
  },
  methods:{
    changeStyle(data:{style:[]}[] = []){
      data.forEach(item =>{
        // if(item.style){

        // }
        item.style.forEach(e => {
          // this.element.style[e.key] = e.value
        })
      })
    },
    onClick(componentId){
      const data = this.linkage.data.filter(item=>item.id = componentId && item.event ==='v-click')
      this.changeStyle(data);
    },
    onHover(componentId){
      const data = this.linkage.data.filter(item=>item.id = componentId && item.event ==='v-hover')
      this.changeStyle(data);
    }
  }

})
</script>