/*
 * @Author: dushuai
 * @Date: 2024-04-12 16:57:59
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-12 18:45:13
 * @description: popups store
 */
import { PopupNames } from '@/common';
import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

type PopupStore = {
  list: Map<PopupNames, Item>
}

type Item = {
  show: boolean
  setShow: (show: boolean) => void
}

export const popupStore: PopupStore = proxy({
  list: new Map<PopupNames, Item>()
});

type Actions = {
  setPopup: (key: PopupNames, item: Item) => void
  removePopup: (key: PopupNames) => void
  clear: () => void
}

export const popupActions: Actions = {

  setPopup(key, item) {
    if(popupStore.list.has(key)) {
      console.warn('弹窗已挂载，将清除历史状态:>> ', key);
      this.removePopup(key);
    }
    popupStore.list.set(key, item);
  },

  removePopup(key) {
    if(popupStore.list.has(key)) {
      popupStore.list.delete(key);
    } else {
      console.warn('弹窗未挂载:>> ', key);
    }
  },

  clear() {
    popupStore.list.clear();
    popupStore.list = new Map<PopupNames, Item>();
  }

};

devtools(popupStore, { name: 'popups store', enabled: true });
