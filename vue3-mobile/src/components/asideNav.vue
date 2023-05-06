<template>
  <aside class="aside-nav">
    <dl class="nav-box">
      <dt class="nav-title">账号管理</dt>
      <dd class="nav-btn">
        <router-link to="/personal/index" :class="{ cur: config.holder == 'personal'}"><em
            class="icon icomoon-gerenxinxi"></em>我的资料</router-link>
      </dd>
      <dd class="nav-btn ">
        <router-link to="/status/index" :class="{ cur: config.holder == 'status'}"><em
            class="icon icomoon-shiming"></em>实名认证</router-link>
      </dd>
    </dl>
    <dl class="nav-box">
      <dt class="nav-title">我的需求</dt>
      <dd class="nav-btn">
        <router-link to="/need/edit" :class="{ cur: config.holder == 'needEdit'}"><em
            class="icon icomoon-gerenxinxi"></em>发布需求</router-link>
      </dd>
      <dd class="nav-btn ">
        <router-link to="/need/list" :class="{ cur: config.holder == 'needList'}"><em
            class="icon icomoon-shiming"></em>我发布的需求</router-link>
      </dd>
    </dl>
    <dl class="nav-box">
      <dt class="nav-title">我的专利</dt>
      <dd class="nav-btn">
        <router-link to="/mine/edit" :class="{ cur: config.holder == 'mineEdit'}"><em
            class="icon icomoon-gerenxinxi"></em>发布专利成果</router-link>
      </dd>
      <dd class="nav-btn ">
        <router-link to="/mine/list" :class="{ cur: config.holder == 'mineList'}"><em
            class="icon icomoon-shiming"></em>我发布的专利成果</router-link>
      </dd>
      <dd class="nav-btn ">
        <router-link to="/mine/star" :class="{ cur: config.holder == 'mineStar'}"><em
            class="icon icomoon-shiming"></em>我收藏的专利</router-link>
      </dd>
    </dl>
    <dl class="nav-box">
      <dt class="nav-title">other</dt>
      <dd class="nav-btn">
        <router-link to="/other/index" >抽奖</router-link>
      </dd>
    </dl>
  </aside>
</template>

<script setup lang="ts">
import { configStore } from '@/store/config'
const config = configStore();



// 本来想用循环，然后发现有独立icon……
// const nav = reactive<Array<nav>>([
//   {
//     title: '账号管理',
//     list: [
//       { label: '我的资料', url: '/' },
//       { label: '实名认证', url: '/ids' }
//     ]
//   }
// ])

</script>

<style scoped lang="scss">




.aside-nav{
  box-sizing: border-box;
  width:190px; padding-top: 30px; margin-right: 10px;
  background-color:$white;
  .nav-box{
    margin-bottom: 40px;
  }
  .nav-title{
    font-size: 14px; padding-left: 24px; margin-bottom: 14px;
    color:#777a80;
  }
  .nav-btn{
    a{
      box-sizing: border-box; display: block;
      height:34px; line-height: 34px; width:100%; padding-left: 22px; font-size: 14px;
      border-left:2px solid rgba(0, 0, 0, 0); color:#333;
      .icon{
        margin-right: 8px; color:#b2b2b2;
      }
      &.cur,
      &:hover{
        background-color: #ecf0f7; border-color:$blue; color:$blue;
        .icon{
          color:$blue;
        }
      }
    }
  }
}
</style>