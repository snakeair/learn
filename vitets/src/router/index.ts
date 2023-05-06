import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

import pinia from "../store/store";

//页面
import index from "@/views/index/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "frame",
    component: index,
  },
  {
    path: "/explain",
    name: "explain",
    component: () => import("@/views/explain/index.vue"),
  },
];

const router = createRouter({
  // linkActiveClass: "cur",
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
});

router.beforeEach((to: any, from, next) => {
  next();
});

export default router;
