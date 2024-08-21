/*
 * @Author: dushuai
 * @Date: 2024-04-07 11:36:37
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-30 14:38:35
 * @description: App 路由 鉴权组件
 */
import { Suspense, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import Loading from '@/components/Loading';

import r, { generateRouter } from './router';
import { usePermission, useSelector } from './store';

export default function App() {

  const [router, setRouter] = useState(r);
  const { GenerateRoutes } = usePermission(useSelector(['GenerateRoutes']));

  useEffect(() => {
    GenerateRoutes().then(r => {
      setRouter(generateRouter(r));
    });
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
