/*
 * @Author: dushuai
 * @Date: 2024-04-18 12:28:06
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-28 16:24:05
 * @description: 创建自定义store
 */
import { StoreKey } from "@/common";
import { create } from "zustand";
import { PersistOptions, combine, devtools, persist } from "zustand/middleware";

type SetStoreState<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined
) => void

export type STATE<T> = { key: keyof T, val: T[keyof T] }

export type MakeState = {
  updateTime: number,
}

export type MakeUpdater<T> = {
  SET_STATE: (data: STATE<T>) => void
  SET_UPDATE_TIME: () => void
  RESET: () => void
}

export type Methods<T, M> = (set: SetStoreState<T>, get: () => M & T & MakeUpdater<T>) => M

/**
 * 创建store
 * @param name store名称
 * @param state state
 * @param methods actions
 * @param persistOptions 持久化配置
 */
export function createCustomStore<T extends Object, M>(
  name: StoreKey,
  state: T,
  methods: Methods<T & MakeState, M>,
  persistOptions: PersistOptions<T & MakeState>
) {

  const initialState: MakeState = {
    updateTime: 0
  }

  const newStore = Object.assign(initialState, state)

  type State = T & MakeState

  type Get = () => State & MakeUpdater<State> & M

  type Set = Partial<MakeState & T>

  return create(
    devtools(
      persist(
        combine(
          newStore,

          (set, get) => ({
            ...methods(set, get as Get),

            /**
             * 一个通用set的方法 可用于偷懒
             * @param data 
             */
            SET_STATE: (data: STATE<State>) => {
              set({ [data.key]: data.val } as Set)
            },

            /**
             * 重置整个store
             */
            RESET() {
              set(newStore)
            },

            /**
             * 更新时间
             */
            SET_UPDATE_TIME() {
              set(() => ({ updateTime: Date.now() }) as Set)
            }
          })
        ),
        persistOptions as any
      ),
      { name, enabled: true }
    )
  )
}
