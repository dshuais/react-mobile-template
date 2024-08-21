/*
 * @Author: dushuai
 * @Date: 2024-04-07 10:25:43
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-10 16:53:27
 * @description: BasicsLayout
 */

import { Outlet, useLocation } from 'react-router-dom';
import { usePopupStore, useSelector } from '@/store';
import { useEffect } from 'react';
import { usePopup } from '@/hooks';

export default function BasicsLayout() {

  const { pathname } = useLocation();

  const { CLEAR } = usePopupStore(useSelector(['CLEAR']));

  const { popCloseAll } = usePopup();

  useEffect(() => {
    return () => {
      // console.log('路由发生了变化:>>  ', pathname);
      popCloseAll();
      CLEAR();
    };
  }, [pathname]);

  return (
    <Outlet />
  );
}
