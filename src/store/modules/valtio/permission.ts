/*
 * @Author: dushuai
 * @Date: 2024-04-07 11:54:24
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-13 23:39:17
 * @description: 权限
 */
import { devtools } from 'valtio/utils';
import { dynamicRoutes } from '@/common';
import { proxy } from 'valtio';
import { deepClone } from '@/utils';
import { lazy } from 'react';
import router from '@/router';
import { getPath, modules } from '@/router/routes';

/**
 * 路由表内的路由
 */
const routes = router.routes;

type Permission = {
  routes: Array<Route>
}

export type Route = App.Route

type AgnosticDataRouteObject = {
  id: string
  path: string
  Component: any
  children?: AgnosticDataRouteObject[]
  handle?: App.Handle
}

export const permisStore: Permission = proxy({
  routes: []
});

const route = routes.findIndex(item => item.path === '/');

export const permisActions = {
  /**
   * 设置路由
   * @param routes
   */
  SetRoutes(routes: Array<Route>) {
    permisStore.routes = routes;
  },

  /**
   * 生成路由表
   */
  GenerateRoutes() {
    return new Promise((resolve) => {
      this.SetRoutes(dynamicRoutes);
      const r = filterAsyncRouter(dynamicRoutes);
      routes[route].children = r;

      resolve('动态路由创建成功');
    });
  }

};

devtools(permisStore, { name: 'permission store', enabled: true });

/**
 * 动态加载路由
 * @param routes
 * @returns
 */
function filterAsyncRouter(routes: Route[]) {
  const newRoutes = deepClone<Route[]>(routes);

  return newRoutes.map(route => {

    const r: AgnosticDataRouteObject = {
      id: route.id,
      path: route.path,
      Component: createComponent(route.component),
      // children: route.children && route.children.length ? filterAsyncRouter(route.children) : void 0,
      handle: route.handle
    };

    if(route.children && route.children.length) {
      r.children = filterAsyncRouter(route.children);
    }

    return r;

  });
}

/**
 * 所有pages下页面文件
 */
// const modules = import.meta.glob('@/pages/*/index.tsx')
/**
 * 所有pages下页面文件 去除了目录前缀
 */
// const components = Object.keys(modules).reduce<Record<string, any>>((prev, cur) => {
//   prev[cur.replace('/src/pages/', '')] = modules[cur]
//   return prev
// }, {})

/**
 * 获取动态页面
 * @param name
 * @returns
 */
function createComponent(name: string) {
  // return lazy(components[`${name}/index.tsx`])
  return lazy(modules[getPath(name)]);
}
