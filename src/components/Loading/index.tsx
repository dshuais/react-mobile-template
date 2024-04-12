/*
 * @Author: dushuai
 * @Date: 2024-03-29 18:14:56
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-07 11:52:43
 * @description: loading 组件
 */
import NProgress from 'nprogress'
import { useEffect } from 'react'
import 'nprogress/nprogress.css'

export default function Loading() {

  useEffect(() => {
    const timer = setTimeout(() => {
      NProgress.start()
    }, 100);

    return () => {
      NProgress.done()
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="text-center my-20">加载中...</div>
  )
}
