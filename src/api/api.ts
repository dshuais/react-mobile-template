/*
 * @Author: dushuai
 * @Date: 2023-03-15 14:44:06
 * @LastEditors: dushuai
 * @LastEditTime: 2024-03-29 17:05:51
 * @description: api
 */
import { get } from '@/axios';

/** 测试接口 */
export const GetCaptcha = (params: unknown) => get<{ captchaImg: string }>('api/captcha', params);
