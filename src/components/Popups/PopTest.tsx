/*
 * @Author: dushuai
 * @Date: 2024-04-12 15:44:41
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-30 15:00:25
 * @description: 测试弹窗组件
 */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { CenterPopup } from 'antd-mobile';
import styles from './PopTest.module.less';
import { usePopupStore } from '@/store';
import { PopupNames } from '@/common';

export type PopTestRef = {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default forwardRef(function PopTest(_, ref) {

  const [show, setShow] = useState(false);

  useImperativeHandle(ref, (): PopTestRef => {
    return {
      show,
      setShow
    };
  }, []);

  const SET_POPUP = usePopupStore(state => state.SET_POPUP);

  useEffect(() => {
    SET_POPUP(PopupNames.popTest, { show, setShow });
  }, []);

  return (
    <CenterPopup visible={show}>
      <div className={styles.bg}>
        我是弹窗
      </div>
      <div className={styles.close} onClick={() => setShow(false)}>close</div>
    </CenterPopup>
  );
});
