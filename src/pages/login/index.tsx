
/*
* @Author: dushuai
* @Date: 2024-03-29 16:13:37
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-30 14:40:11
* @description: login
*/
import { useNavigate, useSearchParams, useSubmit } from 'react-router-dom';

import { useSettings } from '@/store';

function Login() {
  const [params, setParams] = useSearchParams();

  const navigate = useNavigate();

  const sumbit = useSubmit();

  function handleSet() {
    setParams({
      a: 'b'
    });
  }

  const { theme, SET_THEME } = useSettings();

  function handleLogin() {
    const token = 'test-tokentokentokentokentokentokentokentokentokentokentokentokentoken';
    sumbit({ token, redirectTo: params.get('from') || '/' }, { method: 'post', replace: true });
  }

  return (
    <>
      login query a =  {params.get('a')}

      <div>theme: {theme}</div>
      <button onClick={() => SET_THEME('light')}>
        theme
      </button>

      <button onClick={handleSet}>
        set
      </button>
      <br />
      <button onClick={() => navigate('/')}>
        返回
      </button>

      <button onClick={handleLogin}>
        登陆
      </button>
    </>
  );
}

export default Login;
