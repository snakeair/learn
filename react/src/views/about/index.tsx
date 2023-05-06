import React, {useState} from 'react'

import cl from  './index.module.scss'

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
    <div className={`${cl.color} ${cl.lh}`  } style={sBlue} >about</div>
  )
}

export default index