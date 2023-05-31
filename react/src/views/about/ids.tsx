import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from 'antd'

type Props = {}

const ids = (props: Props) => {


  const param = useParams()

  console.log(param);
  
  const [ids, setIds] = useState(parseInt(param.id ? param.id : '0'))

  useEffect( () => {

  }, [ids])

  const addFn = () => {
    setIds(ids + 1)
  }


  return (
    <>
      <div>这是一个嵌套路由的页面, ids 是 {ids}</div>
      <Button onClick={addFn} >ids++</Button>
    </>
  )
}

export default React.memo(ids)