/*
 * @Author: dushuai
 * @Date: 2024-04-01 15:35:04
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-07 17:37:58
 * @description: App基础store
 */
import { proxy, subscribe } from 'valtio'
import { devtools } from 'valtio/utils'

type AppStore = {
  token: string
}

/**
 * default app store
 * @returns AppStore
 */
const getAppStore = (): AppStore => ({
  token: ''
})

/**
 * app store
 */
export const appStore = proxy(
  JSON.parse(sessionStorage.getItem('app-store') as string) || getAppStore()
)

/**
 * actions
 */
export const appActions = {
  setToken(token: string) {
    appStore.token = token
  },
  resetToken() {
    appStore.token = ''
  },

  /**
   * 重置整个store
   */
  reset() {
    const app = getAppStore()
    Object.keys(app).forEach((key) => {
      appStore[key] = app[key as keyof AppStore]
    })
  }
}

/**
 * 订阅AppStore变化
 * 持久化处理
 */
subscribe(appStore, () => {
  sessionStorage.setItem('app-store', JSON.stringify(appStore))
})

/**
 * 配置使用devtools 插件
 */
devtools(appStore, { name: 'app store', enabled: true })
