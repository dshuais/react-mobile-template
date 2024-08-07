
/*
* @Author: dushuai
* @Date: 2024-03-29 16:13:37
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-30 14:39:08
* @description: login
*/
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSettings } from '@/store';

function Home2() {
  const [params, setParams] = useSearchParams();

  const navtivate = useNavigate();

  function handleSet() {
    setParams({
      a: 'b'
    });
  }

  const { theme, SET_THEME } = useSettings();

  return (
    <>
      我是home2
      login query a =  {params.get('a')}

      <div>theme: {theme}</div>
      <button onClick={() => SET_THEME('light')}>
        theme
      </button>

      <button onClick={handleSet}>
        set
      </button>
      <br />
      <button onClick={() => navtivate('/')}>
        返回
      </button>
    </>
  );
}

export default Home2;
