import React, {useState, useEffect} from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { tsState } from '@/store/store'

import Menu from '@/components/module/menu'


import cl from './index.module.scss'

import RouterDom from '@/router/router'

type Props = {}


const index_index = (props: Props) => {

  const [navList, setNavList] = useState([
    {link: '/', label: 'index'},
    {link: '/about', label: 'about'},
    {link: '/other', label: 'other'}
  ])

  

  const user = useSelector( (state: tsState) => state.user)

  const addLinkFn = (data:tsNav) => {
    setNavList([...navList, data])
  }

  const location = useLocation()
  const router = useNavigate()

  

  return (
    <article className={cl.pages} >
      <aside className={cl.asideMain} >  
        <Menu nav={navList}  addLinkFn={addLinkFn} ></Menu>
      </aside>
      <section className={cl.sectionMain} >
        {
          // NOTE 使用 useRoutes 创建路由文件
        }
      <RouterDom></RouterDom>
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