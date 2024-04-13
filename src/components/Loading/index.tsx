/*
 * @Author: dushuai
 * @Date: 2024-03-29 18:14:56
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-13 17:29:30
 * @description: loading 组件
 */
import styles from "./index.module.css"

export default function Loading() {
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
