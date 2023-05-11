import React, {useState} from 'react'

import cl from  './index.module.scss'
//
import  AboutDom  from '@/components/module/aboutDom'

type Props = {}

const index = (props: Props) => {

  const [blue, setBlue] = useState(false)

  const setBlueFn = () => {
    setBlue(true)
  }
  setTimeout(() => {
    setBlueFn();
    console.log('blue');
  }, 3000);

  const sBlue = {
    color: blue ? '' : 'blue'
  }

  return (
    <div className={`${cl.color} ${cl.lh}`  } style={sBlue} >
      <AboutDom></AboutDom>
    </div>
  )
}

export default index