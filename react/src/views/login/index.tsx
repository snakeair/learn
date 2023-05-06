import React, {useState}  from 'react'
import { Button } from 'antd'

import el from './index.module.scss'

type Props = {}

const index = (props: Props) => {
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
    </>
  )
}

export default index