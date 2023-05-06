import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { tsState } from '@/store/store'

// 模块
import Index from './index'
import About from '@/views/about/index'
import Menu from '@/components/module/menu'
import User from '@/views/user/index'

import cl from './index.module.scss'

type Props = {}


const index_index = (props: Props) => {

  const [navList, setNavList] = useState([
    {link: '/', label: 'index'},
    {link: '/about', label: 'about'},
  ])

  const user = useSelector( (state: tsState) => state.user)

  const addLinkFn = (data:tsNav) => {
    setNavList([...navList, data])
  }


  return (
    <article className={cl.pages} >
      <aside className={cl.asideMain} >  
        <Menu nav={navList}  addLinkFn={addLinkFn} ></Menu>
      </aside>
      <section className={cl.sectionMain} >
        <Routes>
          <Route path='/' element={<Index/>}  ></Route>
          <Route path='/about' element={<About/>}  ></Route>
          <Route path='/user' element={<User/>}  ></Route>
        </Routes>
        <div>
          <p>{user.type}</p>
        </div>
      </section>
    </article>
  )
}

export default index_index