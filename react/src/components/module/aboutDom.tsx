import React, {useState, useEffect, useReducer, useContext, useCallback} from 'react'
import { Button } from 'antd';
import MainContext from '@/context/mainContext';

const aboutDom = () => {
  console.log('this is aboutDom');
  
  const [bl, setBl] = useState(false);

  const [count, countDispatch] = useReducer( (state:number, action:boolean) => {
    let i = state;
    if(action === true) {
      i++
    } else if(action === false) {
      i--
    }
    return i
  }, 0)

  const addCount = () => {
    countDispatch(true)
  }
  const subCount = () => {
    countDispatch(false)
  }

  // usecallback 内的回调函数不会在组件渲染的时候重新渲染，只会在依赖项修改后重新渲染
  const blFn = useCallback(() =>{
    setBl(true)
  }, [bl, setBl])



  //  state的无限刷新是因为他是在渲染阶段执行的，不会检查state是否相同，会直接将组件重新挂载到渲染队列
  //  useeffect 表示所有执行是在组件渲染完成之后执行的，所以在检查state相同后就不在执行
  //  effect 可以接收第二个参数，这个参数将是effect的依赖项，只有依赖项发生变化时effect才会触发，一般会将effect的内部变量都设置为依赖项
  useEffect( () => {
    if(count === 0) {
    setBl(true)
  }
  }, [count, setBl])



  // context 是用
  const mContext = useContext(MainContext)

  return (
    <>
      <div>aboutDom</div>
      <Button onClick={subCount} >sub</Button> <span>{count}</span> <Button onClick={addCount} >add</Button>
      {
        // context使用
      }
    </>
    
  )
}

// 默认导出
export default aboutDom

