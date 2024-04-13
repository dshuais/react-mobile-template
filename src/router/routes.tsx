/*
 * @Author: dushuai
 * @Date: 2024-03-29 16:17:20
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-13 23:38:44
 * @description: 路由表
 */
import { ComponentType, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const BasicsLayout = lazy(() => import('@/layouts/basics'))
// const Home = lazy(() => import('@/pages/home'))
// const ErrorElement = lazy(() => import('@/pages/error'))

type Module = {
  [keys in string]: () => Promise<{ default: ComponentType<any>; }>
}

/**
 * 所有pages下页面文件
 */
export const modules = import.meta.glob('@/pages/*/index.tsx') as unknown as Module

const routes: RouteObject[] = [
  {
    path: '/',
    Component: BasicsLayout,
    children: []
    // element: <Home />,
    // errorElement: <ErrorElement />,
    // 使用嵌套路由需要在 父页面元素内加上 <Outlet /> 组件
    // children: [
    //   {
    //     id: 'Home',
    //     path: '/',
    //     // element: <Home />
    //     Component: lazy(modules['/src/pages/home/index.tsx'])
    //   }
    // ],
    // handle: {
    //   title: 'Home'
    // }
  },
  {
    path: '/login',
    // async lazy() {
    //   let { default: Login } = await import('@/pages/login')
    //   return { Component: Login }
    // }
    // Component: lazy(() => import('@/pages/login'))
    Component: lazy(modules[getPath('login')])
  },
  {
    path: '*',
    Component: lazy(modules[getPath('error')])
    // element: <ErrorElement />,
    // errorElement: <ErrorElement />
  }
]

export default routes

/**
 * 获取页面路径
 * @param name 
 * @returns 
 */
export function getPath(name: string) {
  return `/src/pages/${name}/index.tsx`
}
