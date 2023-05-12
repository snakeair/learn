import React from 'react'

import { useSelector } from 'react-redux'
import {tsState} from '@/store/store'
import {setUser, setAdmin} from '@/store/userStore'

import redux from '@/hooks/reduxHook'

import { Button } from 'antd'

type Props = {}

const index = (props: Props) => {

  const login = useSelector((state: tsState) => state.user);

  const setUserFn = ():void => {
    dispatchFn(setUser({user:'jack', phone: '13300000000'}) )
  }
  const {dispatchFn} = redux({});


  const setAdminFn = () => {
    dispatchFn(setAdmin('admin'))
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