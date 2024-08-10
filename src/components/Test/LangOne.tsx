/*
 * @Author: dushuai
 * @Date: 2024-08-10 12:56:49
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-10 16:52:39
 * @description: 心平气和
 */

import { useSettings, useSelector } from '@/store';

export default function LangOne() {

  // const { lang, SET_STATE } = useSettings(state => state);
  // const lang = useSettings((state) => state.lang);
  // const SET_STATE = useSettings((state) => state.SET_STATE);
  const { lang, SET_STATE } = useSettings(useSelector(['lang', 'SET_STATE']));

  return (
    <div>
      <div>lang: {lang}</div>
      <button className="p-1 bg-red-400" onClick={() => SET_STATE({ lang: lang === 'en' ? 'zh' : 'en' })}>LangOne lang</button>
    </div>
  );
}
