import { defineConfig } from 'vite'
import {resolve} from "path"
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:[
      {
        find:'@',
        replacement:resolve(__dirname, "src")
      },
      {
        find:'comps',
        replacement:resolve(__dirname, "src/components")
      },
      {
        find:'views',
        replacement:resolve(__dirname, "src/views")
      },
      {
        find:'style',
        replacement:resolve(__dirname,"src/styles")
      }
    ]
  },
  // css:{
  //   preprocessorOptions:{
  //     scss:{
  //       additionalData:'@import "./src/assets/scss/globalVar.scss";@import "./src/assets/scss/globalMixin.scss";'
  //     }
  //   }
  // }
})
