import { App, defineAsyncComponent } from 'vue'
const components:string[] = [
  'VText',
  'VTest'
]

export const registerComponent = (app:App) =>{
  components.forEach(key =>{
    // const {default:component} = await import(`./${key}/Component.vue`);
    // const path = "./"+key + "/*.vue"
    // let modules = await import.meta.glob(path);
    // console.log(modules);
    // app.component(key, import(`./${key}/Component.vue`));
    app.component(key, defineAsyncComponent(()=> import(`./${key}/Component.vue`)) );

    // app.component(key, import.meta.glob("./"+key + "/Component.vue"))
    // const {default:attr} = await import(`./${key}/Attr.vue`);

    app.component(key + 'attr',defineAsyncComponent(()=>import(`./${key}/Attr.vue`)) );

  })
  
}
// components.forEach(key=>{
//   Vue.defineComponent()
// })

