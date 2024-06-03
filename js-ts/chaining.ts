function arrange () {
  const task:Function[] = []
  let timer : number | null  = null
  
  function wait (timer) {
    task.push( () => {
      return new Promise( resolve => {
        setTimeout(() => {
          console.log('wait');
          resolve('wait')
        }, timer * 1000);
      })
    })
    taskFn()
    return this
    // 返回this 返回原始对象以用来调用其他方法
  }
  
  function dofirst  () {
    task.push( () => {
      return new Promise( resolve => {
        console.log('this is first working') 
        resolve('this is first working')
      })
    })
    taskFn()
    return this
  }
  function end () {
    task.push( () => {
      return new Promise( resolve => {
        console.log('this is end working');
        resolve('this is end working')
      })
    })
    taskFn()
    return this
  }
  
  function taskFn () {
    if(timer) {
      clearTimeout(timer) 
      timer = null
    }
    timer = setTimeout(() => {
      start()
    }, 100);
  }
  
  async function start () {
    console.log('doing');
    for (const t of task) {
      await t()
    }
  }
  
  return {
    wait,
    dofirst,
    end,
  }
}

arrange().wait(3).dofirst().wait(3).end()