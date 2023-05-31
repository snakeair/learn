import React from 'react'

import HeaderDom from '@/components/class/header'

type Props = {}


const index = (props: Props) => {

  console.log('index');
  
  
  // const data = useLoginMutation({user: '13333333', pwd: '123456'})

  return (
    <div>
      <header  >
        <HeaderDom title={'this is class components -- headerBox'} ></HeaderDom>
      </header>
    </div>
  )
}

export default index