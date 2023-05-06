<template>
  <div class="login-header">
    <div class="box">
      <h3 class="logo"><img src="@/assets/images/head-logo.png" alt=""><router-link to="/index" class="back-index">个人中心</router-link></h3>
      <div>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">



</script>

<style scoped lang="scss">


$border: #d2d2d2;
.login-header{
  height: 70px;
  background-color: $white; 
  .box{
    @include flex(both, center);
    width:1200px; height:100%; margin:0 auto;
  }
  .logo{
    .img{
      width: 100%; height:100%
    }
  }
  .back-index{
    position: relative;
    margin-left: 20px; font-size: 16px; 
    color:#121212;
    &:before{
      content: '';
      display: inline-block; vertical-align: middle;
      width:1px; height:18px;  margin-right: 20px;  margin-top: -2px;
      background-color: $border;;
    }
    &:hover{
      color:$blue;
    }
  }
}
</style>