/*
 * @Author: dushuai
 * @Date: 2024-04-12 15:44:41
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-12 16:16:15
 * @description: 测试弹窗组件
 */
import { useEffect, useState } from 'react'
import { CenterPopup } from 'antd-mobile'
import styles from './PopTest.module.less'

export default function PopTest() {

  const [show, setShow] = useState(true)

  useEffect(() => {
    console.log('弹窗挂载');

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
}
