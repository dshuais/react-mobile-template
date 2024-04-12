
/*
* @Author: dushuai
* @Date: 2024-03-29 16:13:37
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-12 11:15:04
* @description: login
*/
import { useNavigate, useSearchParams } from "react-router-dom"
import { useSnapshot } from 'valtio'
import { setStore, setActions, appActions } from '@/store'

function Login() {
  const [params, setParams] = useSearchParams()

  const navigate = useNavigate()

  function handleSet() {
    setParams({
      a: 'b'
    })
  }

  const { theme } = useSnapshot(setStore)

  function handleLogin() {
    appActions.setToken('test-tokentokentokentokentokentokentokentokentokentokentokentokentoken')
    navigate('/', { replace: true })
  }

  return (
    <>
      login query a =  {params.get('a')}

      <div>theme: {theme}</div>
      <button onClick={() => setActions.setTheme('light')}>
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
  )
}

export default Login
