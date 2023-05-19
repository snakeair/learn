import React from 'react'
import { Link, NavLink } from 'react-router-dom'


import './menu.scss'
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

  const curFn = ({isActive}) => {
    return isActive?"cur link":"link "
  }
  

  return (
    <div className='menu'>
      <span>
      </span>
      <nav  >
        {
          nav.map( (el) => {
            return  <NavLink  className={curFn} key={el.link} to={el.link} >{el.label}</NavLink>
          })
        }
      </nav>
      <Button type="primary" onClick={setLinkFn} >add link</Button>
    </div>
  )
}

export default React.memo(menu)
