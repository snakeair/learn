import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
// import { HashRouter as Router } from 'react-router-dom'
// NOTE: 引入router并设置为根目录
// NOTE: hash模式 和 browser 模式， 在是用browser的时候需要在服务器设置地址转发，将所有的地址请求转发到index.html文件
/**
 *  //INFO nginx中 conf文件夹 nginx.conf 文件 修改
*    location / {
*      root html;
*      # index  index.html index.htm
*      try_files $uri /index.html
*    }
*/

import '@/assets/sass/reset.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
