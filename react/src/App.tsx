import React, { useState } from 'react'
import {Routes, Route } from 'react-router-dom'

// 引入 provider 并添加入App
import { Provider } from 'react-redux/es/exports'
import store from '@/store/store'

import Index from '@/views/index/index_index'
import Login from '@/views/login/index'


function App() {
  return (
    <Provider store={store} >
      <Routes>
        <Route  path="/*" element={<Index />}  ></Route>
        <Route path="login" element={<Login />}  ></Route>
      </Routes>
    </Provider>
  )
}

export default App

