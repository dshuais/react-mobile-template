/*
 * @Author: dushuai
 * @Date: 2024-04-12 15:44:41
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-12 18:12:39
 * @description: 测试弹窗组件
 */
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { CenterPopup } from 'antd-mobile'
import styles from './PopTest.module.less'
import { popupActions } from '@/store'
import { PopupNames } from '@/common'

export type PopTestRef = {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default forwardRef(function PopTest(_, ref) {

  const [show, setShow] = useState(false)

  useImperativeHandle(ref, (): PopTestRef => {
    return {
      show,
      setShow
    }
  }, [])


  useEffect(() => {
    console.log('弹窗挂载');
    popupActions.setPopup(PopupNames.popTest, { show, setShow })

    return () => {
      console.log('弹窗卸载');
    }
  }, [])

  return (
    <CenterPopup visible={show}>
      <div className={styles.bg}>
        我是弹窗
      </div>
      <div className={styles.close} onClick={() => setShow(false)}>close</div>
    </CenterPopup>
  )
})
