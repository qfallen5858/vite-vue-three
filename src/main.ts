import { createApp } from "vue";
import ElementPlus from "element-plus";
import * as ElementPlusIconVue from '@element-plus/icons-vue'
import "element-plus/dist/index.css";
import "./styles/style.css";
import App from "./App.vue";
import router from "./router/index";

const app = createApp(App);
for(const [key, component] of Object.entries(ElementPlusIconVue)){
  app.component(key, component)
}
app.use(router).use(ElementPlus).mount("#app");
