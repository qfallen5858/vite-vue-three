import { createRouter, createWebHistory } from "vue-router";

const home = () => import("../components/HelloWorld.vue");

const routes = [
  {
    path: "/home",
    name: "home",
    meta: {
      title: "home",
      keepAlive: true,
      requireAuth: false,
    },
    component: home,
  },
];

const router = createRouter({ history: createWebHistory(), routes });
export default router;
