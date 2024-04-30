/*
 * @Author: dushuai
 * @Date: 2024-04-07 10:25:43
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-30 14:43:13
 * @description: BasicsLayout
 */

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import { usePopup } from "@/hooks";

export default function BasicsLayout() {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const token = useAppStore(state => state.token)

  const { popCloseAll } = usePopup()

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    return () => {
      console.log('路由发生了变化:>>              ', pathname);
      popCloseAll()
      // popupActions.clear()
    }

  }, [pathname, token])

  if (!token) {
    return <Loading />
  }

  return (
    <Outlet />
  )
}
