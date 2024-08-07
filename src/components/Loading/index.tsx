/*
 * @Author: dushuai
 * @Date: 2024-03-29 18:14:56
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-13 22:49:21
 * @description: loading 组件
 */
import { useMemo } from 'react';
import { useSetState } from 'ahooks';

import styles from './index.module.less';

export default function Loading() {

  const [state] = useSetState({
    type: TYPE.TWO
  });

  const Component = useMemo(() => {
    return state.type === TYPE.ONE ? LoadingOne : LoadingTwo;
  }, [state.type]);

  return (
    <Component />
  );
}

// 规则循环旋转
function LoadingOne() {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}>
        <div className={styles.circle} />
        <div className={styles.circle} />
        <div className={styles.circle} />
        <div className={styles.circle} />
      </div>
    </div>
  );
}

// 不规则旋转
function LoadingTwo() {
  return (
    <div className={styles['loading-two']}>
      <div className={styles.loader} />
    </div>
  );
}

const TYPE = {
  ONE: 'one',
  TWO: 'two'
};
