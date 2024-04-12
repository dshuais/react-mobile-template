
/*
* @Author: dushuai
* @Date: 2024-03-29 16:13:37
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-11 17:03:27
* @description: login
*/
import { useNavigate, useSearchParams } from "react-router-dom"
import { useSnapshot } from 'valtio'
import { setStore, setActions } from '@/store'

function Login() {
  const [params, setParams] = useSearchParams()

  const navtivate = useNavigate()

  function handleSet() {
    setParams({
      a: 'b'
    })
  }

  const { theme } = useSnapshot(setStore)

  return (
    <>
      我是home2
      login query a =  {params.get('a')}

      <div>theme: {theme}</div>
      <button onClick={() => setActions.setTheme('light')}>
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
  )
}

export default Login
