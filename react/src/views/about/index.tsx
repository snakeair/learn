import React, {useState} from 'react'
import { Route, Routes, Outlet, Link, useNavigate  } from 'react-router-dom'
import  AboutDom  from '@/components/module/aboutDom'
import cl from  './index.module.scss'
import Ids from './ids'
import {Button} from 'antd'


type Props = {}

const index = (props: Props) => {

  const [blue, setBlue] = useState(false)

  const setBlueFn = () => {
    setBlue(true)
  }
  setTimeout(() => {
    setBlueFn();
  }, 3000);

  const sBlue = {
    color: blue ? '' : 'blue'
  }

  

  // const history = createHashHistory()
  const [ids, setIds] = useState(1)
  const router = useNavigate()
  const toIdsFn = () => {
    router(`/about/ids/${ids}`)
  }
  
  

  return (
    <div className={`${cl.color} ${cl.lh}`  } style={sBlue} >
      <div>
        <AboutDom></AboutDom>
      </div>
      <Button onClick={toIdsFn} >子页面开关</Button>
      <Outlet/>
    </div>
  )
}

export default React.memo(index)