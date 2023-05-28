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
      }
    ]
  }
})
