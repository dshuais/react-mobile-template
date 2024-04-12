/*
 * @Author: dushuai
 * @Date: 2024-03-29 12:30:24
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-07 17:33:24
 * @description: main入口
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/style/index.css'
import App from './App'

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
