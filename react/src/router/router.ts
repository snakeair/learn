import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";

import Index from "@/views/index/index";
import About from "@/views/about/index";
import Ids from "@/views/about/ids";
import User from "@/views/user/index";
import Other from "@/views/other/other";

// 声明类型
export interface SyncRoute {
  path: string;
  component: React.LazyExoticComponent<any>;
  children?: Array<SyncRoute>;
  meta?: {
    title?: string;
    needLogin?: boolean;
  };
}

const router = () => {
  let element = useRoutes([
    { path: "index", element: <Index /> },
    { path: "user", element: <User /> },
    { path: "other", element: <Other /> },
    { path: "about", element: <About /> },
  ]);

  return element;
};

export default router;
