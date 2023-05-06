<template>
  <div class="defualt-frame" >
    <header class="default-header">
      <userTop></userTop>
      <userHeader pageName="个人中心">
        <template v-slot:right>
          <div class="user-info" btn>
            <h3 class="user">13300000000 <em class="icomoon-xiangxia icon"></em></h3>
            <ul class="user-action">
              <li class="li my-data" @click="personalFn">我的资料</li>
              <li class="li out" @click="logoutFn">退出</li>
            </ul>
          </div>
        </template>
      </userHeader>
    </header>
    <section class="user-container">
      <AsideNav class="aside-nav"></AsideNav>
      <div class="user-main">
        <router-view></router-view>
      </div>
    </section>
    <footer class="default-footer">
      <userFooter></userFooter>
    </footer>
  </div>
</template>

<script setup lang="ts">

//store 
import { configStore } from '@/store/config';

import qs from 'qs'

const user = ref<user>()

const getUserDataFn =  ():void =>{
  let use = sessionStorage.getItem('user')
  if (use) {
    user.value = qs.parse(use)
  } else {
    router.push({
      path: '/login'
    })
  }
}

const config = configStore();

const router = useRouter();
// 个人资料
const personalFn = ():void => {
  router.push({
    path: '/personal/index'
  })
}
// 退出
const logoutFn = ():void => {
  console.log('logout');
}








// getUserDataFn();
</script>

<style scoped lang="scss">




.defualt-frame{
  position: relative; box-sizing: border-box;
  min-height:100vh;
  background-color: #f5f6f8;
}
.default-header{
  box-sizing: border-box;
  .user-info{
    position: relative;
    font-size: 14px; height:34px; line-height: 34px;
    color:#333;
    .icon{
      font-size: 12px;
    }
    .user-action{
      position: absolute; display: none;
      right:0;
      .li{
        display: block; text-align: center;
        width:104px; height:36px; line-height: 36px;
        color:#333; background-color: $white;
        &:hover{
          background-color: #ecf0f7;
        }
      }
    }
    &:hover{
      color:$blue;
      .user-action{
        display: block;
      }
    }
  }
}
.user-container{
  @include flex(left, top); 
  align-items: stretch;
  width: 1200px; margin:11px auto 38px;
  .user-main{
    width: 1000px;
  }
}
.default-footer{
  box-sizing: border-box;
}
</style>