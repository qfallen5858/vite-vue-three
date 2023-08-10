import { createApp, App } from "vue";
import ElementPlus from "element-plus";
import * as ElementPlusIconVue from '@element-plus/icons-vue'
import "asset/iconfont/iconfont.css"
import "element-plus/dist/index.css";
import "style/style.css";
import "style/scss/animate.scss";
import "style/scss/globalVar.scss"
import "style/scss/globalMixin.scss"
import "style/reset.css"
import "style/scss/global.scss"
import AppComponent from "./App.vue";
import router from "./router/index";

import {registerComponent} from "@/components/custom-component"

import {createPinia, Pinia} from "pinia"

const pinia:Pinia = createPinia();


const app:App = createApp(AppComponent);
for(const [key, component] of Object.entries(ElementPlusIconVue)){
  app.component(key, component)
}
registerComponent(app);
app.use(router).use(ElementPlus).use(pinia).mount("#app");
// app.use(router).mount("#app")
