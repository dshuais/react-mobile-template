/*
 * @Author: dushuai
 * @Date: 2024-04-18 15:09:58
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-18 17:20:05
 * @description: settings store
 */
import { StoreKey } from '@/common'
import { MakeState, createCustomStore } from '../store'
import { createJSONStorage } from 'zustand/middleware'

type Store = {
  theme: 'dark' | 'light'
}

const initialState = (): Store => ({
  theme: 'light',
})

/**
 * 当前store版本
 * 更改后需要手动修改并添加migrate逻辑
 */
const APP_STORE_VERSION: number = 0.1

export const useSettings = createCustomStore(
  StoreKey.SETTINGS,

  initialState(),

  (set) => ({

    SET_THEME(theme: Store['theme']) {
      set({ theme })
    },

  }),

  {
    name: StoreKey.SETTINGS, // unique name
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
