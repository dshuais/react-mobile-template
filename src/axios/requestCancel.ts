/*
 * @Author: dushuai
 * @Date: 2023-04-03 10:50:16
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-03 12:29:50
 * @description: 取消重复请求
 */
import type { AxiosRequestConfig } from 'axios';
import qs from 'qs';

/** pendingMap val类型 */
interface Pending {
  url: string,
  c: AbortController
}
/** 存放当前请求的map */
let pendingMap = new Map<string, Pending>();

/**
 * 通过请求参数生成 map key
 * @param {AxiosRequestConfig} config 请求参数
 * @returns {string} key
 */
export const getPendingUrl = (config: AxiosRequestConfig): string => [config.url, config.method, qs.stringify(config.data), qs.stringify(config.params)].join('&');

/**
 * 添加、取消、取消全部和重置pendingMap的方法
 */
class CancelRequest {
  /**
   * 添加请求至pending列表
   * @param {AxiosRequestConfig} config 请求参数
   */
  addPending(config: AxiosRequestConfig): void {
    this.removePending(config); // 添加前先执行删除 避免重复
    const controller: AbortController = new AbortController(),
      key = getPendingUrl(config);

    config.signal = controller.signal;
    pendingMap.set(key, {
      url: config.url as string,
      c: controller
    });
  }

  /**
   * 取消重复的请求 并 删除map
   * @param {AxiosRequestConfig} config 请求参数
   */
  removePending(config: AxiosRequestConfig): void {
    const key = getPendingUrl(config);

    if(pendingMap.has(key)) {
      const val = pendingMap.get(key);
      val?.c.abort();
      pendingMap.delete(key);
      // console.log('请求取消:>> ', config.url)
    }
  }

  /**
   * 取消当前未执行完毕的所有请求
   */
  clearAllPending() {
    pendingMap.forEach(pending => {
      pending.c.abort();
    });
    pendingMap.clear();
  }

  /**
   * 重置当前请求列表pendingMap
   */
  resetPending() {
    pendingMap = new Map<string, Pending>();
  }
}

export const cancelRequest = new CancelRequest();
