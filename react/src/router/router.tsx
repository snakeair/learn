import React, { lazy, Suspense, useEffect } from "react";
import { useRoutes, RouteObject, useNavigate, useLocation } from "react-router-dom";


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



// NOTE: 懒加载
// NOTE: lazy是react的一个api，用于说明这个模式是懒加载
// NOTE: Suspense 挂起请求
const lazyLoad = (src:any) => {
  const Preview = lazy(() => import(src));
  return <Suspense fallback={<>...</>}><Preview /></Suspense>
};


const router = () => {

  const router = useNavigate();
  const location = useLocation();

  if(location.pathname === '/other') {
      console.log('router');
      router('/' )
    }


  let routes: RouteObject[] = [
    {  
      path: "/", 
      element: lazyLoad( '../views/index/index')  ,
    },
    { 
      path: 'user', 
      element: lazyLoad( '../views/user/index'),
    },
    { 
      path: 'about', 
      element: lazyLoad( '../views/about/index'), 
      children: [
        {path: 'ids/:id', element: lazyLoad( '../views/about/ids')}
      ]
    },
    { 
      path: 'other', 
      element: lazyLoad( '../views/other/other') 
    },
  ]

  const Views = () => useRoutes(routes)
  return (
        <Views />
    );
};

export default router;
