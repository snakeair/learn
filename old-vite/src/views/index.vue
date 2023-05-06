<template>
  <div>
    <h1>{{ msg }}</h1>
    <common-header :titleName="titleName" ></common-header>

    <p>
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
      +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    </p>

    <p>See <code>README.md</code> for more information.</p>

    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">
        Vite Docs
      </a>
      |
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
    </p>

    <button type="button" @click="count++; $store.commit('add')">count is: {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
    <p>
      {{ $store.state.counter }}
    </p>
    <p>
      {{ dbCount }}
    </p>
    <div>
      {{ $store.state.user}}
    </div>
    <router-link to="/error" >error</router-link>
    <div @click="errorFn" >error</div>
  </div>
</template>



<script lang="ts" setup >

import { defineComponent, ref, computed  } from 'vue'

// components
import  commonHeader from '../components/header.vue'

import { useStore } from 'vuex';
import { key } from '../store';
const store = useStore(key);

import { useRouter } from 'vue-router';
const router = useRouter();

import { http } from '../until/axios';
const $http = http()

// import type 表示引入的是一个类型
import type {PropType} from 'vue';
// 这里下面声明了一个titleName的变量名和引入的type的titleName冲突s
// import type  { titleName } from '../types';

const titleName = ref('this is a props from father vue');


/** 环境变量 */
let env = import.meta.env.VITE_APP_TITLE
let title = ''
if (env == 'dev') {
   title = 'http://www.baidu.com'
} 
if (env == 'build') {
   title = 'http://www.baidus.com'
}



let msg = ref<string>(title);

let count = ref<number>(1);

let dbCount = computed( ():number =>  store.state.counter * 2 )

const admin = {
  user: 'jack',
  token: '12345',
  sex: true,
  img: '../../1.jpg'
}



// 使用namespaced之后需要在函数名前加伤文件别名
// store.commit('user/$loginFn', admin)
store.dispatch('user/initLogin', admin)
$http.get('/qzh/goods/index', {id: 1}).then(res => {})
$http.get('/qzh/goods/match_goods', {}).then(res => {})
$http.get('/qzh/goods/publish_contract_goods', {}).then(res => {})
$http.get('/qzh/goods/publish_contract_goods', {}).then(res => {})
$http.get('qzh/goods/publish_goods', {}).then(res => {})
$http.get('qzh/goods/publish_goods', {}).then(res => {})
$http.get('qzh/goods/publish_goods', {}).then(res => {})


const errorFn = function  () {
  router.push({
    path: '/error'
  })
}

</script>

<style lang="scss" scoped>
a {
  color: $red2;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
