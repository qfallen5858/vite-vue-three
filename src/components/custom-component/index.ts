import { App } from 'vue'
const components:string[] = [
  'VText'
]

export const registerComponent = (app:App) =>{
  components.forEach(async key =>{
    // const {default:component} = await import(`./${key}/Component.vue`);

    app.component(key, ()=> import(`./${key}/Component.vue`));

    // const {default:attr} = await import(`./${key}/Attr.vue`);

    app.component(key, import(`./${key}/Attr.vue`));

  })
  
}
// components.forEach(key=>{
//   Vue.defineComponent()
// })

