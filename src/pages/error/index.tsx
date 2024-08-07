/*
 * @Author: dushuai
 * @Date: 2024-03-29 17:33:13
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-07 17:34:57
 * @description: error page
 */
import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="container mx-auto text-center">
      <h1 className="text-6xl py-10 font-bold">Oops!</h1>
      <p className="py-5">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{(error && (error.statusText || error.message)) || 'Page not found!'}</i>
      </p>
      <Link to="/" className="block mx-auto my-3 bg-amber-500 w-24 h-8 leading-8 rounded-md text-white">Go Home</Link>
    </div>
  );
}
