/*
 * @Author: dushuai
 * @Date: 2024-04-07 11:36:37
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-12 18:32:33
 * @description: App 路由 鉴权组件
 */
import { RouterProvider, useLocation } from "react-router-dom";
import router from "./router";
import { Suspense, useCallback, useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { appStore, permisActions } from "./store";
import { useSnapshot } from "valtio";

export default function App() {

  const { token } = useSnapshot(appStore)

  const [visible, setVisible] = useState(false)

  // const [location] = useState(useLocation())

  useEffect(() => {
    if (token) {
      permisActions.GenerateRoutes()
        .then(() => {
          setVisible(true)
        })
    }
  }, [token])

  const getPath = useCallback(() => {
    return router.state.location.pathname
  }, [])

  useEffect(() => {
    // console.log(router.state.location.pathname);
    // console.log(getPath());

  }, [getPath()])

  /**
   * 当动态路由添加完成 再渲染页面
   * 否则页面会渲染在添加路由之前导致白屏
   */
  if (!visible && token) {
    return <Loading />
  }

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
