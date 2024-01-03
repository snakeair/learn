<template>
  <div>

  </div>
</template>

<script setup lang="ts">
console.log('class');

const request = () => {
  return new Promise(resolve => {
    // 模拟请求后得到db对象
    setTimeout(() => {
      resolve({
        get: key => key,
      });
    }, 300);
  });
};
class DB {
  private db:any;
  private loaded:any;
  constructor() {
    this.init();
  }

  init() {
    this.loaded = new Promise( resolve => {
      return request().then(res => {
        this.db = res;
        resolve(res)
      });
    })
  }

  getItem() {
   this.loaded.then( (res:any) => {
    console.log(this.db.get('info'));
   })
  }
  // NOTE init中db的获取是异步的，直接调用会报错，所以，把init封装在了一个promise中然后赋值给私有变量loaded，在获取的时候先执行loaded就可以保证在promise执行完毕db已经赋值之后再获取
}

const base = new DB()
base.getItem()

</script>

<style scoped>

</style>