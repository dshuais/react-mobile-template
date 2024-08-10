/*
 * @Author: dushuai
 * @Date: 2024-04-12 18:09:03
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-10 13:21:01
 * @description: 枚举文件
 */

export const APP_KEY = 'react-mobile-template';

/**
 * 弹窗名称
 */
export enum PopupNames {
  popTest = 'popTest', // 示例弹窗
  PopTestTwo = 'popTestTwo'
}

/**
 * store key
 */
export enum StoreKey {
  APP = `app-store-${APP_KEY}`,
  SETTINGS = `settings-store-${APP_KEY}`,
  PERMISSION = `permission-store-${APP_KEY}`,
  POPUP = `popup-store-${APP_KEY}`
}

/**
 * 主题
 */
export enum Theme {
  light = 'light',
  dark = 'dark'
}
