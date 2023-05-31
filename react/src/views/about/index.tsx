import React, {useState} from 'react'
import { Route, Routes, Outlet,  } from 'react-router-dom'
// import {createHashHistory } from 'history'
import  AboutDom  from '@/components/module/aboutDom'
import cl from  './index.module.scss'
import Ids from './ids'



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
  
  
  

  return (
    <div className={`${cl.color} ${cl.lh}`  } style={sBlue} >
      <AboutDom></AboutDom>
      <Routes>
        <Route path=":id" element={<Ids/>} ></Route>
      </Routes>
      {/* <Outlet/> */}
    </div>
  )
}

export default React.memo(index)