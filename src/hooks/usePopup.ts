/*
 * @Author: dushuai
 * @Date: 2024-04-12 17:36:51
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-12 18:13:36
 * @description: 弹窗hooks
 */
import { PopupNames } from '@/common'
import { popupStore } from '@/store'
import { useSnapshot } from 'valtio'

export function usePopup(): PopupType {

  const { list } = useSnapshot(popupStore)

  /**
   * 打开的弹窗
   */
  const openPopups: PopupType["openPopups"] = new Map()

  /**
   * 弹窗打开的方法
   * @param key 要打开的弹窗
   * @param other 是否关闭其他弹窗 可选，默认false不关闭
   */
  async function popShow(key: PopupNames, other: boolean = false) {
    if (list.has(key)) {
      const pop = list.get(key)!

      if (pop.show) return console.warn('该弹窗已处于打开状态:>> ', key)

      if (other) await popCloseAll()

      pop.setShow(true)

      if (!openPopups.has(key)) openPopups.set(key, close(key))
    } else {
      console.warn('此页面没有该弹窗:>> ', key)
    }
  }

  /**
   * 弹窗关闭的方法
   * @param key 要关闭的弹窗
   */
  function popClose(key: PopupNames) {
    if (openPopups.has(key)) {
      openPopups.get(key)!()
      openPopups.delete(key)
    } else {
      console.warn('该弹窗已处于关闭状态:>> ', key)
    }
  }

  /**
   * 关闭弹窗
   * @param key 要关闭的弹窗
   * @returns 返回一个关闭弹窗方法
   */
  function close(key: PopupNames) {
    return () => {
      if (list.has(key)) {
        const pop = list.get(key)!

        if (!pop.show) return console.warn('该弹窗已处于关闭状态:>> ', key)

        pop.setShow(false)
      } else {
        console.warn('此页面没有该弹窗:>> ', key)
      }
    }
  }

  /**
   * 项目内关闭所有弹窗的方法
   * @returns 
   */
  function popCloseAll(): Promise<boolean> {
    return new Promise(resolve => {
      openPopups.forEach(close => close())

      resetOpenPopups()

      resolve(true)
    })
  }

  /**
   * 重置openPopups 弹框列表
   */
  function resetOpenPopups() {
    openPopups.clear()
  }

  return {
    openPopups,
    popShow,
    popClose,
    popCloseAll
  }

}

type PopupType = {

  openPopups: Map<PopupNames, Function>

  popShow: (key: PopupNames, other?: boolean) => void

  popClose: (key: PopupNames) => void

  popCloseAll: () => Promise<boolean>

}