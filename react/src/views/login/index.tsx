import React, {useState}  from 'react'
import { useSearchParams, useParams, useLocation  } from 'react-router-dom'
import { Button } from 'antd'

import el from './index.module.scss'

type Props = {}

const index = (props: Props) => {

  // NOTE: useSearchParams() 用来获取 '?' 携带的路由参数，
  // NOTE: 通过 searchParams 获取，并可以通过 setSearchParams 修改 但是设置的时候必须设置完全参数，不能独立设置
  let [searchParams, setSearchParams] = useSearchParams();
   const paramsFn = () => {
    setSearchParams({name: 'sam', id: '18'})
  }

  

  
  // NOTE: location 可以获取完整的路由信息
  const location = useLocation()
  console.log(location);
  


  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const setUsernameFn = (el:any) => {
    setUsername(el.target.value)
  }
  const setPwdFn = (el:any) => {
    setPwd(el.target.value);
  }
  const loginFn = () => {
    let data = {
      username: username,
      pwd: pwd
    }
    console.log(data);
  }

 
  
  return (
    <>
      <form className={el.formBox} >
        <input className={el.input} type='text' value={username} onChange={setUsernameFn} />
        <input className={el.input} type='password' value={pwd} onChange={setPwdFn} />
        <Button type='primary' onClick={loginFn} >登陆</Button>
      </form>
      <Button onClick={paramsFn} >参数</Button>
    </>
  )
}

export default index