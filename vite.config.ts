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
        find:'component',
        replacement:resolve(__dirname, "src/components")
      },
      {
        find:'view',
        replacement:resolve(__dirname, "src/views")
      },
      {
        find:'style',
        replacement:resolve(__dirname,"src/styles")
      },
      {
        find:'asset',
        replacement:resolve(__dirname,"src/assets")
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
