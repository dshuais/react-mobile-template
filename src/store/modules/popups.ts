/*
 * @Author: dushuai
 * @Date: 2024-04-30 14:47:16
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-30 15:56:23
 * @description: popups store
 */

import { PopupNames, StoreKey } from '@/common';
import { MakeState, createCustomStore, serializerMap, deserializerMap } from '../store';
import { createJSONStorage } from 'zustand/middleware';

type Store = {
  list: List
}

type Actions = {
  SET_POPUP: (key: PopupNames, item: Item) => void
  REMOVE_POPUP: (key: PopupNames) => void
  CLEAR: () => void
}

type Item = {
  show: boolean
  setShow: (show: boolean) => void
}

type List = {
  [key in PopupNames]: Item
} | object

type MapList = Map<PopupNames, Item>

const initialState = (): Store => ({
  list: {}
});

/**
 * 当前store版本
 * 更改后需要手动修改并添加migrate逻辑
 */
const APP_STORE_VERSION: number = 0.1;

export const usePopupStore = createCustomStore<Store, Actions>(
  StoreKey.POPUP,

  initialState(),

  (set, get) => ({

    /**
     * 挂载popup
     * @param key
     * @param item
     */
    SET_POPUP(key: PopupNames, item: Item) {

      const list = getList(get().list);

      if(list.has(key)) {
        console.warn('弹窗已挂载，将清除历史状态:>> ', key);
        get().REMOVE_POPUP(key);
      }
      list.set(key, item);

      set({ list: setList(list) });
    },

    /**
     * 移除popup
     * @param key
     */
    REMOVE_POPUP(key: PopupNames) {
      const list = getList(get().list);

      if(list.has(key)) {
        list.delete(key);
      } else {
        console.warn('弹窗未挂载:>> ', key);
      }
      set({ list: setList(list) });
    },

    /**
     * 清空
     */
    CLEAR() {
      const list = getList(get().list);
      list.clear();
      set({ list: {}});
    }

  }),

  {
    name: StoreKey.POPUP, // unique name
    storage: createJSONStorage(() => sessionStorage),
    version: APP_STORE_VERSION, // a migration will be triggered if the version in the storage mismatches this one

    // migration logic
    migrate: (persistedState, version) => {
      type State = Store & MakeState

      const state = initialState();

      if(version !== APP_STORE_VERSION) {
        Object.assign(state, persistedState);
      }

      return state as State;
    }
  }
);

/**
 * 对list序列化为mapList
 * @param {List} list
 * @returns MapList
 */
export const getList = (list: List) => serializerMap<MapList>(list);

/**
 * 反序列化MapList
 * @param {MapList} list
 * @returns list
 */
export const setList = (list: MapList) => deserializerMap<List>(list);
