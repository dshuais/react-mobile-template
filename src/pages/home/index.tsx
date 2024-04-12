/*
 * @Author: dushuai
 * @Date: 2024-03-29 16:10:20
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-12 12:13:27
 * @description: Home
 */
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './index.module.css'
import { useSnapshot } from 'valtio'
import { appStore, appActions, setStore, setActions } from '@/store'
import { DialogContext } from '@/common'
import LoadingIcon from '@/assets/icons/loading.svg?react'
import loadingIcon from '@/assets/icons/loading.svg'
import ViteLogo from '@/assets/react.svg?react'
import RobotIcon from '@/assets/icons/robot.svg?react'
import Test from '@/components/Test'

function App() {
  const [count, setCount] = useState(0)

  const countMemo = useMemo(() => {
    return count * 5 - count
  }, [count])

  const navigate = useNavigate()

  function handleJumpLogin() {
    navigate('/login', { state: { b: 666 } })
  }

  const { token } = useSnapshot(appStore)
  const { theme } = useSnapshot(setStore)
  // const actions = useSnapshot(appActions)

  console.log('父组件');

  return (
    <DialogContext.Provider value={{}}>
      <div className={styles.root}>
        <div className={styles.div}></div>
        <div className={`break-all ${styles.token}`}>token: {token}</div>
        <button onClick={() => appActions.setToken(token + '123')}>
          修改token
        </button>
        <button onClick={() => appActions.reset()}>
          重置
        </button>
        <div>theme: {theme}</div>
        <button onClick={() => setActions.setTheme('dark')}>
          theme
        </button>
        <LoadingIcon className='fill-[#1d93ab] w-16 h-16' />
        <ViteLogo />
        <RobotIcon className='fill-[#1d93ab] w-16 h-16' />
        <img src={loadingIcon} alt="" />
        <div className="flex justify-center items-center">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className={styles.logo} alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className={`${styles.logo} ${styles.react}`} alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className={styles.card}>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}<br />
            countMemo is {countMemo}
          </button>

          <button onClick={handleJumpLogin}>
            jumpLogin
          </button>
          <button onClick={() => navigate('/home2')}>
            jumpHome2
          </button>

          {/* {
            count % 2 === 0 ? <Test /> : <div>没有子组件</div>
          } */}
          <Test />

          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className={styles['read-the-docs']}>
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </DialogContext.Provider>
  )
}

export default App
