import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";


import frame from '@/layouts/default.vue'
//页面
import index from "@/views/index.vue";


import pinia from "stores/store";
import {configStore} from "stores/config";
const config = configStore(pinia);

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "index",
    name: "frame",
    component: frame,
    children: [
      // 首页
      {
        path: "/index",
        name: "index",
        component: index,
        meta: {
          title: config.title
        }
      },
      // 个人信息
    ],
  },
  {
    path: "/about",
    name: "about",
    meta: { holder: "personal" },
    component: () => import("@/views/about.vue"),
  },
];

const router = createRouter({
  // linkActiveClass: "cur",
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, left: 0 };
  },
});

router.beforeEach((to: any, from, next) => {
  document.title = to.meta.title
  if (to.path == "/login" && from.path != "/index") {
    if (from.path != "/index" && !to.query.back) {
      next({
        path: to.path,
        query: {
          ...to.query,
          back: from.path,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
