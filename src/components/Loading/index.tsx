/*
 * @Author: dushuai
 * @Date: 2024-03-29 18:14:56
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-13 21:06:35
 * @description: loading 组件
 */
import styles from "./index.module.less"

export default function Loading() {
  return (
    <LoadingTwo />
  )
}

// 规则循环旋转
// @ts-expect-error
function LoadingOne() {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </div>
  )
}

// 不规则旋转
function LoadingTwo() {
  return (
    <div className={styles['loading-two']}>
      <div className={styles.loader}></div>
    </div>
  )
}
