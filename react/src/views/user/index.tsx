import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {tsState} from '@/store/store'
import {setUser, setAdmin} from '@/store/userStore'

import { Button } from 'antd'

type Props = {}

const index = (props: Props) => {

  const login = useSelector((state: tsState) => state.user);
  const dispatch = useDispatch();

  const setUserFn = ():void => {
    dispatch(setUser({user:'jack', phone: '13300000000'} ))
  }

  const setAdminFn = () => {
    dispatch(setAdmin('admin'))
    console.log(login.type);
    
  }

  return (
    <>
      <div>{login.user}</div>
      <div>{login.phone}</div>
      <Button  onClick={setUserFn} >setUserFn</Button>
      <Button  onClick={setAdminFn} >setAdminFn</Button>
    </>
  )
}

export default index