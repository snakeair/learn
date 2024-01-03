<template>
  <article class="page" >
    <el-main>
      <div class="common-light-btn">
        <div class="btn"></div>
      </div>
    </el-main>
    
    <el-main>
      <div class="common-bun-loading">正在加载中<div class="bun">...</div></div>
    </el-main>
    
    <el-main>
      <div class="tj">
        <div class="white"></div>
      </div>
    </el-main>
  </article>
</template>

<script setup lang="ts">
import {loginApi} from '@/api/login'
// const {signIn} = loginApi()
// signIn({username: '123', pwd: '123123'})

const arr = [
  1,2,3,4
]
let result = [] as any;
arr.forEach((item, index) => {
  item = item + 2
  result[index] = item 
});
console.log('arr', arr);
console.log('result', result);


console.log("End");


</script>

<style scoped lang="scss" >
// 流光边框
.page{
  box-sizing: border-box;
  padding:200px;
  background-color: #f5f5f5;
}


.tj{
  overflow: hidden; position: relative;
  width:300px; height:300px; border-radius: 50%;
  background-color: black;
  .white{
    width:150px; height:300px;
    background-color: white;
  }
  &:before{
    content: '';
    display: block; position: absolute;
    width:150px; height:150px; border-radius: 50%;
    background-color: black;  top:0%; left:50%; 
    transform: translateX(-50%);
  }
  &:after{
    content: '';
    display: block; position: absolute;
    width:150px; height:150px; border-radius: 50%;
    background-color: white;  bottom:0%; left:50%; 
    transform: translateX(-50%);
  }
}



</style>