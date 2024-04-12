/*
 * @Author: dushuai
 * @Date: 2023-03-20 09:33:25
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-11 11:12:45
 * @description: ts类型文件
 */

interface Window {
  mozRequestAnimationFrame: Function,

  webkitRequestAnimationFrame: Function,

  msRequestAnimationFrame: Function,

  mozCancelAnimationFrame: Function
}

/**
 * App内数据类型
 */
declare namespace App {

  /**
   * 路由类型
   */
  type Route = {
    id: string
    path: string
    component: string
    redirect?: string
    children?: Array<Route>
    handle?: Handle
  }

  type Handle = {
    title?: string
    icon?: string
    roles?: string[] // 'admin' | 'other'
  }

}
