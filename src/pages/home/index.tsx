/*
 * @Author: dushuai
 * @Date: 2024-03-29 16:10:20
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-30 15:54:02
 * @description: Home
 */
import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './index.module.css'
import { useAppStore, useSettings } from '@/store'
import { DialogContext, PopupNames } from '@/common'
import LoadingIcon from '@/assets/icons/loading.svg?react'
import loadingIcon from '@/assets/icons/loading.svg'
import ViteLogo from '@/assets/react.svg?react'
import RobotIcon from '@/assets/icons/robot.svg?react'
import Test from '@/components/Test'
import { Button } from 'antd-mobile'
import PopTest, { PopTestRef } from '@/components/Popups/PopTest'
import PopTestTwo from '@/components/Popups/PopTestTwo'
import { usePopup } from '@/hooks'

function App() {
  const [count, setCount] = useState(0)
  const [two, setTwo] = useState(false)

  const countMemo = useMemo(() => {
    return count * 5 - count
  }, [count])

  const navigate = useNavigate()

  function handleJumpLogin() {
    navigate('/login', { state: { b: 666 } })
  }

  const token = useAppStore(state => state.token)
  const RESET_APP = useAppStore(state => state.RESET)
  const SET_TOKEN = useAppStore(state => state.SET_TOKEN)
  const { theme, SET_THEME } = useSettings()

  // console.log('父组件');

  const ref = useRef<PopTestRef>(null)

  const { popShow } = usePopup()

  function handleClick() {
    // Toast.show({
    //   icon: 'loading',
    //   content: 'Loading...',
    //   maskClickable: false,
    //   duration: 3000,
    //   afterClose: () => {
    //     console.log('after')
    //   },
    // })
    setCount(count + 1)
    // ref.current?.setShow(true)
    popShow(PopupNames.popTest)
    setTwo(true)
  }

  return (
    <DialogContext.Provider value={{}}>
      <div className={styles.root}>
        <Button color='primary' fill='solid' onClick={handleClick}>
          Solid
        </Button>
        <Button color='primary' fill='solid' onClick={()=>popShow(PopupNames.PopTestTwo)}>
          Solid2
        </Button>

        <PopTest ref={ref} />

        {
          two ? <PopTestTwo /> : null
        }

        <div className={styles.div}></div>
        <div className={`break-all ${styles.token}`}>token: {token}</div>
        <button onClick={() => SET_TOKEN(token + '123')}>
          修改token
        </button>
        <button onClick={RESET_APP}>
          重置
        </button>
        <div>theme: {theme}</div>
        <button onClick={() => SET_THEME('dark')}>
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
          <Test count={count} />

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
