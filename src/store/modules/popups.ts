/*
 * @Author: dushuai
 * @Date: 2024-04-30 14:47:16
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-30 15:56:23
 * @description: popups store
 */

import { PopupNames, StoreKey } from "@/common"
import { MakeState, createCustomStore, serializerMap } from '../store'
import { createJSONStorage } from "zustand/middleware"

type Store = {
  list: Map<PopupNames, Item>
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

const initialState = (): Store => ({
  list: new Map<PopupNames, Item>(),
})

/**
 * 当前store版本
 * 更改后需要手动修改并添加migrate逻辑
 */
const APP_STORE_VERSION: number = 0.1

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

      const list = serializerMap<Map<PopupNames, Item>>(get().list)

      console.log(list, get().list);

      if (list.has(key)) {
        console.warn('弹窗已挂载，将清除历史状态:>> ', key);
        get().REMOVE_POPUP(key)
      }
      list.set(key, item)
      set({ list })

      console.log(list, get().list);

    },

    /**
     * 移除popup
     * @param key 
     */
    REMOVE_POPUP(key: PopupNames) {
      const list = serializerMap<Map<PopupNames, Item>>(get().list)

      if (list.has(key)) {
        console.log('key', key);

        list.delete(key)
      } else {
        console.warn('弹窗未挂载:>> ', key)
      }
      set({ list })
    },

    /**
     * 清空
     */
    CLEAR() {
      get().list.clear()
      set({ list: new Map() })
    }

  }),

  {
    name: StoreKey.POPUP, // unique name
    storage: createJSONStorage(() => sessionStorage),
    version: APP_STORE_VERSION, // a migration will be triggered if the version in the storage mismatches this one

    // migration logic
    migrate: (persistedState, version) => {
      type State = Store & MakeState

      const state = initialState()

      if (version != APP_STORE_VERSION) {
        Object.assign(state, persistedState,)
      }

      return state as State
    }
  }
)
