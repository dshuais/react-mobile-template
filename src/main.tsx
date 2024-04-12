/*
 * @Author: dushuai
 * @Date: 2024-03-29 12:30:24
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-12 12:20:54
 * @description: main入口
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'amfe-flexible'
import './assets/style/index.css'

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
