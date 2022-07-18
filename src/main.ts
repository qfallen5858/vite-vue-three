import { createApp } from "vue";
// import "bootstrap"
// import "bootstrap/dist/css/bootstrap.css";
import "./styles/style.css";
import App from "./App.vue";
import router from "./router/index";

createApp(App).use(router).mount("#app");
