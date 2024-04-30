import { dynamicRoutes, StoreKey } from "@/common"
import { deepClone } from "@/utils"
import { lazy } from "react"
import router from '@/router'
import { getPath, modules } from "@/router/routes"
import { MakeState, createCustomStore } from '../store'
import { createJSONStorage } from 'zustand/middleware'

type Store = {
  routes: Array<Route>
}

type Actions = {
  SET_ROUTER: (routes: Array<Route>) => void
  REMOVE_ROUTER: () => void
  GenerateRoutes: () => Promise<string>
}

export type Route = App.Route

type AgnosticDataRouteObject = {
  id: string
  path: string
  Component: any
  children?: AgnosticDataRouteObject[]
  handle?: App.Handle
}


/**
 * 路由表内的路由
 */
const routes = router.routes

const route = routes.findIndex(item => item.path === '/')

/**
 * 当前store版本
 * 更改后需要手动修改并添加migrate逻辑
 */
const APP_STORE_VERSION: number = 0.1

const initialState = (): Store => ({
  routes: []
})

export const usePermission = createCustomStore<Store, Actions>(
  StoreKey.PERMISSION,

  initialState(),

  (set, get) => ({

    /**
     * 设置路由
     * @param routes 
     */
    SET_ROUTER(routes: Array<Route>) {
      set({ routes })
    },

    REMOVE_ROUTER() {
      set({ routes: [] })
    },

    /**
     * 生成路由表
     */
    GenerateRoutes: () => {
      return new Promise((resolve) => {
        get().SET_ROUTER(dynamicRoutes)
        const r = filterAsyncRouter(dynamicRoutes)
        routes[route].children = r

        resolve('动态路由创建成功')
      })
    },

  }),

  {
    name: StoreKey.PERMISSION, // unique name
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

/**
 * 动态加载路由
 * @param routes 
 * @returns 
 */
function filterAsyncRouter(routes: Route[]) {
  const newRoutes = deepClone<Route[]>(routes)

  return newRoutes.map(route => {

    const r: AgnosticDataRouteObject = {
      id: route.id,
      path: route.path,
      Component: createComponent(route.component),
      // children: route.children && route.children.length ? filterAsyncRouter(route.children) : void 0,
      handle: route.handle
    }

    if (route.children && route.children.length) {
      r.children = filterAsyncRouter(route.children)
    }

    return r

  })
}

/**
 * 所有pages下页面文件
 */
// const modules = import.meta.glob('@/pages/*/index.tsx') as unknown as Module

/**
 * 所有pages下页面文件 去除了目录前缀
 */
// const components = Object.keys(modules).reduce<Record<string, any>>((prev, cur) => {
//   prev[cur.replace('/src/pages/', '')] = modules[cur]
//   return prev
// }, {})

/**
 * 获取动态页面
 * @param name 
 * @returns 
 */
function createComponent(name: string) {
  // return lazy(components[`${name}/index.tsx`])
  return lazy(modules[getPath(name)])
}

