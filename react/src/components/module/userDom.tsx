import React from 'react'

import { useSelector } from 'react-redux'
import {tsState} from '@/store/store'
import {setUser, setAdmin} from '@/store/userStore'
import {useDelUserMutation, useSetUserMutation, useGetUserQuery} from '@/store/userApi'

import redux from '@/hooks/reduxHook'

import { Button } from 'antd'

type Props = {}

const index = (props: Props) => {

  // NOTE: userSelector 内函数的state参数表示所有的store，需要那个返回那个就行了
  const login = useSelector((state: tsState) => state.user);

  const setUserFn = ():void => {
    // NOTE:  调用rtk的hook 函数，不用频繁引入rtk文件
    dispatchFn(setUser({user:'jack', phone: '13300000000'}) )
  }
  const {dispatchFn} = redux({});
 

  const setAdminFn = () => {
    dispatchFn(setAdmin('admin'))
    console.log(login.type);
  }


  const holder = useGetUserQuery(10, {
    // NOTE: useQuery 还可以在独立请求中设置参数
    // NOTE  设置返回的结果 result 为默认结果，就是下面那一堆
    selectFromResult: (result) => {
      // return result
      delete result.currentData;
      delete result.error;
      return {
        result
      }
    },
    // NOTE 循环请求监听 0 表示不循环，单位毫秒
    pollingInterval: 0, 
    // NOTE 禁止请求，例如在参数错误的时候禁止请求 默认false
    skip: false,
    // NOTE 是否使用缓存 false 正常是用，true 每次都重载， 数字，一定时间内用缓存，单位秒
    refetchOnMountOrArgChange: false,
    // NOTE 是否在页面获取焦点后重新加载 需要设置 setupListeners
    refetchOnFocus: false,
    // NOTE 断网重连 需要设置 setupListeners
    refetchOnReconnect: false,
  });
  /**
   *  // INFO 请求返回的结果
   *  // NOTE data: 最新的数据，如果新请求的数据还没有回来，那么里面就是上一次的数据
   *  // NOTE currentData 当前参数的数据，如果还没有返回那么内容就是undefined，除此之外数据一般情况下和data一样
   *  // NOTE refetch： 重新加载数据
   *  // NOTE isLoading  数据是否第一次加载
   *  // NOTE isFetching 是否加载中
   *  // NOTE status pending 正在加载中 fulfilled 加载完成
   *  // NOTE isError 请求是否有错误
   *  // NOTE isSuccess 请求是否成功
   *  // NOTE isUninitialized 请求是否还没有发送 一般是false
   *  // NOTE error() 有错误时存在，
   */
  console.log(holder);
  
  // NOTE useDelUserMutation不会立即执行，upData是他的触发器，再次执行upDataFn时才会执行
  // NOTE 这相当于初始化useDelUserMutation()
  const [delDataFn, {result}] = useDelUserMutation()
  // NOTE result在上面已经是用过了，所以这里需要设置一个别名
  const [setDataFn, {result: setResult}] = useSetUserMutation()


  return (
    <>
      <div>{login.user}</div>
      <div>{login.phone}</div>
      <Button  onClick={setUserFn} >setUserFn</Button>
      <Button  onClick={setAdminFn} >setAdminFn</Button>
    </>
  )
}

export default React.memo(index)