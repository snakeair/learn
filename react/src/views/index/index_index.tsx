import React, {useState} from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { tsState } from '@/store/store'

// 模块
import Index from './index'
import About from '@/views/about/index'
import Ids from '@/views/about/ids'
import User from '@/views/user/index'
import Other from '@/views/other/other'

import Menu from '@/components/module/menu'
import HeaderDom from '@/components/class/header'

import cl from './index.module.scss'

import RouterDom from '@/router/index'

type Props = {}


const index_index = (props: Props) => {

  const [navList, setNavList] = useState([
    {link: '/', label: 'index'},
    {link: '/about/1', label: 'about'},
    {link: '/other', label: 'other'}
  ])

  

  const user = useSelector( (state: tsState) => state.user)

  const addLinkFn = (data:tsNav) => {
    setNavList([...navList, data])
  }

  const location = useLocation()
  const router = useNavigate()
  console.log(location.pathname);
  if(location.pathname === '/other') {
    router('/', {replace: true})
  }
  

  return (
    <article className={cl.pages} >
      <aside className={cl.asideMain} >  
        <Menu nav={navList}  addLinkFn={addLinkFn} ></Menu>
      </aside>
      <section className={cl.sectionMain} >
        {/* <div>
          <header  >
            <HeaderDom title={'this is class components -- headerBox'} ></HeaderDom>
          </header>
          <p>{user.type}</p>
        </div> */}
        <Routes>
          <RouterDom></RouterDom>
        </Routes>
        {
        // <Routes>
        //   <Route path='/' element={<Index/>}  ></Route>
        //   {
        //     // NOTE: 这是两种嵌套路由的方式一种是
        //     // NOTE: 第一种在父级页面中使用routes 和 route 展示组件
        //     // NOTE: 第二种是全部写在路由页面，然后在父级页面中使用 <outLet/> 展示
        //     // NOTE: 使用第一种的时候可以使用路由参数来展示子页面
        //   }
        //   <Route path='/about/*' element={<About/>}  ></Route>
        //   {/* <Route path='/about/:id' element={<About/>}  >
        //     <Route path='id' element={<Ids/>} ></Route>
        //   </Route> */}
        //   <Route path='/user' element={<User/>}  ></Route>
        //   <Route path='other' element={<Other/>}></Route>
        // </Routes>
        }
      </section>
    </article>
  )
}

export default index_index