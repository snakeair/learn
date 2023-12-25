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
    name: "index",
    component: index,
    meta: {
      // title: "红包助力",
    },
  },
];

const router = createRouter({
  // linkActiveClass: "cur",
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to: any, from, next) => {
  if (to.meta.title && to.meta.title !== "") {
    document.title = to.meta.title;
  }

  let channel = from.query.channel;

  if (channel) {
    if (to.query.channel) {
      next();
    } else {
      next({
        path: to.path,
        query: {
          ...to.query,
          channel: channel,
        },
      });
    }
  } else {
    next();
  }
});

export default router;
