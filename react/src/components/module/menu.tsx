import React from 'react'
import { Link } from 'react-router-dom'


import cl from './menu.module.scss'
import { Button } from 'antd'

type Props = {
  nav: Array<tsNav>
  addLinkFn: Function
}

const menu = (props: Props) => {
  const {nav, addLinkFn} = props
  
  const setLinkFn = () => {
    addLinkFn({
      link: '/user',
      label: 'user'
    })
  }
  

  return (
    <div className={cl.menu}>
      <span>
      </span>
      <nav  >
        {
          nav.map( (el) => {
            return  <Link className={cl.link} key={el.link} to={el.link} >{el.label}</Link>
          })
        }
      </nav>
      <Button type="primary" onClick={setLinkFn} >add link</Button>
    </div>
  )
}

export default menu
