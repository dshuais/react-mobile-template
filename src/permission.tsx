/*
 * @Author: dushuai
 * @Date: 2024-08-19 21:19:46
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-19 22:10:28
 * @description: permission 权限控制的最佳使用
 *
 * 用法：/login、/logout、/(id: 'root') 为一级路由，所有功能路由均存在于/下 或者新建一级路由
 *
 * 受保护：需要登录后才能访问的路由 使用loader: ProtectedLoader
 * 登录：外部调用登录接口成功后 调用用 useSubmit() 方法
 *      useSubmit()({ token, redirectTo: params.get('from') || '/' }, { method: 'post', replace: true });
 * 登出：有外部接口时 在接口成功后 调用 useFetcher() 方法
 *      useFetcher().submit(null, { action: '/logout', method: 'post' });
 *
 * 所有逻辑均可根据实际情况进行修改
 */
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

import { useAppStore } from '@/store';

export type AuthStatus = {
  token: string | void;
}

/**
 * root根目录的Loader 根据需要设置使用
 */
export function RootLoader(): AuthStatus {
  const token = useAppStore.getState().token;

  return { token };
  //  Get our logged in user, if they exist, from the root route loader data
  //  const { token } = useRouteLoaderData('root') as AuthStatus;
}

/**
 * 受保护页面的Loader
 */
export function ProtectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const { token } = useAppStore.getState();

  if(!token) {
    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/login?' + params.toString());
  }
  return null;
}

/**
 * login页面的Loader 主要用来频闭登陆后再次进入/login
 * 所有有该需求的页面都可以使用
 */
export async function LoginLoader() {
  const { token } = useAppStore.getState();
  if(token) {
    return redirect('/');
  }
  return null;
}

/**
 * 登录的action 登陆后自动跳转到之前想要访问的页面
 */
export async function LoginAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const token = formData.get('token') as string | null;
  const app = useAppStore.getState();

  // Validate our form inputs and return validation errors via useActionData()
  if(!token) {
    return console.warn('You must provide a token to log in');
    // return {
    // error: 'You must provide a token to log in'
    /**
     * action内return error时 只能通过 useActionData() as { error: string } | undefined 来获取，根据需要使用
     */
    // };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    app.SET_TOKEN(token);
  } catch(error) {
    // Unused as of now but this is how you would handle invalid
    // username/password combinations - just like validating the inputs
    // above
    return console.warn('Invalid login attempt');
    // return {
    //   error: 'Invalid login attempt'
    // };
  }

  const redirectTo = formData.get('redirectTo') as string | null;
  return redirect(redirectTo || '/');
}

/**
 * 退出登录的action
 */
export function LogoutAction() {
  // We signout in a "resource route" that we can hit from a fetcher.Form
  useAppStore.getState().REMOVE_TOKEN();
  return redirect('/login');
}
