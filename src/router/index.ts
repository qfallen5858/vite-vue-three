import { createRouter, createWebHistory } from "vue-router";

const home = () => import("../components/HelloWorld.vue");
const editor = () => import("../views/editor/index.vue");
const viewer3d = () => import("../components/Viewer3d.vue")
const routes = [
  {
    path:"/",
    name:"index",
    component:editor

  },
  {
    path: "/home",
    name: "home",
    meta: {
      title: "home",
      keepAlive: true,
      requireAuth: false,
    },
    component: editor,
  },
];

const router = createRouter({ history: createWebHistory(), routes });
export default router;
