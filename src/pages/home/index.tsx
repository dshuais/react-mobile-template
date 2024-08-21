/*
 * @Author: dushuai
 * @Date: 2024-03-29 16:10:20
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-10 13:34:49
 * @description: Home
 */
import { useMemo, useRef, useState } from 'react';
import { useNavigate, useFetcher } from 'react-router-dom';
import { Button } from 'antd-mobile';

import PopTest, { PopTestRef } from '@/components/Popups/PopTest';
import PopTestTwo from '@/components/Popups/PopTestTwo';
import Test from '@/components/Test';
import LoadingIcon from '@/assets/icons/loading.svg?react';
import loadingIcon from '@/assets/icons/loading.svg';
import ViteLogo from '@/assets/react.svg?react';
import RobotIcon from '@/assets/icons/robot.svg?react';
import ThemeOne from '@/components/Test/ThemeOne';
import LangOne from '@/components/Test/LangOne';

import { useAppStore, useSettings } from '@/store';
import { DialogContext, PopupNames } from '@/common';
import { usePopup } from '@/hooks';

import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import styles from './index.module.css';

function App() {
  const [count, setCount] = useState(0);
  const [two, setTwo] = useState(false);

  const countMemo = useMemo(() => {
    return count * 5 - count;
  }, [count]);

  const navigate = useNavigate();
  const fetcher = useFetcher();

  function handleJumpLogin() {
    navigate('/login', { state: { b: 666 }});
  }

  const token = useAppStore(state => state.token);
  const SET_TOKEN = useAppStore(state => state.SET_TOKEN);
  const SET_THEME = useSettings(state => state.SET_THEME);

  const ref = useRef<PopTestRef>(null);

  const { popShow } = usePopup();

  function handleClick() {
    setCount(count + 1);
    popShow(PopupNames.popTest);
    setTwo(true);
  }

  function handleLogout() {
    fetcher.submit(null, { action: '/logout', method: 'post' });
  }

  return (
    <DialogContext.Provider value={{}}>
      <ThemeOne />
      <LangOne />
      <hr />
      <div className={styles.root}>
        <Button color="primary" fill="solid" onClick={handleClick}>
          Solid
        </Button>
        <Button color="primary" fill="solid" onClick={() => popShow(PopupNames.PopTestTwo)}>
          Solid2
        </Button>

        <PopTest ref={ref} />

        {
          two ? <PopTestTwo /> : null
        }

        <div className={styles.div} />
        <div className={`break-all ${styles.token}`}>token: {token}</div>
        <button onClick={() => SET_TOKEN(token + '123')}>
          修改token
        </button>
        <button onClick={handleLogout}>
          重置
        </button>
        {/* <div>theme: {theme}</div> */}
        <button onClick={() => SET_THEME('dark')} className="p-4 bg-pink-400">
        dark
        </button>
        <button onClick={() => SET_THEME('light')} className="p-4 bg-violet-500 ml-4">
        light
        </button>
        <LoadingIcon className="fill-[#1d93ab] w-16 h-16" />
        <ViteLogo />
        <RobotIcon className="fill-[#1d93ab] w-16 h-16" />
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
  );
}

export default App;
