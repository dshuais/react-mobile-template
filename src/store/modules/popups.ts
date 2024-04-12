/*
 * @Author: dushuai
 * @Date: 2024-04-12 16:57:59
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-12 17:22:48
 * @description: popups store
 */
import { proxy } from "valtio";
import { devtools } from "valtio/utils";

type PopupStore = {
  list: Map<string, Item>
}

type Item = {
  setShow: (show: boolean) => void
}

export const popupStore: PopupStore = proxy({
  list: new Map<string, Item>()
})

type Actions = {
  setPopup: (key: string, item: Item) => void
  removePopup: (key: string) => void
  clear: () => void

  showPopup: (key: string) => void
}

export const popupActions: Actions = {

  setPopup(key, item) {
    if (popupStore.list.has(key)) {
      console.warn('弹窗已挂载，将清除历史状态:>> ', key);
      this.removePopup(key)
    }
    popupStore.list.set(key, item)
    console.log(key, ' 挂载成功');

  },

  removePopup(key) {
    if (popupStore.list.has(key)) {
      popupStore.list.delete(key)
    } else {
      console.warn('弹窗未挂载:>> ', key)
    }
  },

  clear() {
    popupStore.list.clear()
    popupStore.list = new Map<string, Item>()
  },

  showPopup(key) {
    if (popupStore.list.has(key)) {
      popupStore.list.get(key)!.setShow(true)
    } else {
      console.warn('弹窗未挂载:>> ', key)
    }
  }

}

devtools(popupStore, { name: 'popups store', enabled: true })
