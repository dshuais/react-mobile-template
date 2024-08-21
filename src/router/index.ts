/*
 * @Author: dushuai
 * @Date: 2024-03-29 16:05:16
 * @LastEditors: dushuai
 * @LastEditTime: 2024-03-29 16:18:29
 * @description: router
 */
import routes from './routes';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

export default createBrowserRouter(routes);

/**
 * 生成路由表
 * @param routes 路由数组
 * @returns
 */
export function generateRouter(routes: RouteObject[]) {
  return createBrowserRouter(routes);
}
