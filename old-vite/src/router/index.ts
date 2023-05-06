import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Index from "@/views/index.vue";

// 在route默认的属性之外额外声明我们需要的属性，例如 页面使用isLogin来判断是否需要验证登录
export type AppRouteRecordRaw = RouteRecordRaw & {
  isLogin?: boolean;
};
const routes: Array<AppRouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/views/error.vue"),
  },
];

// 声明 router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 页面跳转钩子
router.beforeEach((to, from, next) => {
  let name: any = to.name;
  if (!router.hasRoute(name)) {
    router.push("/error");
  }
  next();
});

// 页面错误提示
router.onError((handler) => {
  console.log("error", handler);
});

//导出
export default router;
