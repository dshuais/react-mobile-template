/*
 * @Author: dushuai
 * @Date: 2024-04-01 16:31:58
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-01 16:44:31
 * @description: 配置 store
 */
import { proxy, subscribe } from 'valtio';
import { devtools } from 'valtio/utils';

type Theme = 'light' | 'dark'

type Settings = {
  theme: Theme
}

const getSettings = (): Settings => ({
  theme: 'light'
});

export const setStore = proxy(JSON.parse(localStorage.getItem('settings-store') as string) || getSettings());

export const setActions = {
  setTheme(theme: Theme) {
    setStore.theme = theme;
  }
};

subscribe(setStore, () => {
  localStorage.setItem('settings-store', JSON.stringify(setStore));
});

devtools(setStore, { name: 'settings store', enabled: true });
