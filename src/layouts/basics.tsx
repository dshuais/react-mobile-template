/*
 * @Author: dushuai
 * @Date: 2024-04-07 10:25:43
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-09 21:13:06
 * @description: BasicsLayout
 */

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { appStore } from "@/store";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import Loading from "@/components/Loading";

export default function BasicsLayout() {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { token } = useSnapshot(appStore)

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true })
      return
    }
  }, [pathname, token])

  if (!token) {
    return <Loading />
  }

  return (
    <Outlet />
  )
}
