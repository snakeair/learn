<template>
  <div>
    <dl class="wait-module">
      <dt class="img-box"><img src="@/assets/images/status/img-02.png" alt=""></dt>
      <dd class="msg">未通过系统审核，请重新提交资料</dd>
      <dd class="text">驳回原因：{{errMsg}}</dd>
    </dl>
    <router-link to="/status/index" class="btn-btn">重新提交</router-link>
  </div>
</template>

<script setup lang="ts">
let props = defineProps({
  errMsg: String
})


</script>

<style scoped lang="scss" >
.img-box{
  width:50px; height:55px; margin: 60px auto 20px; 
}
.msg{
  text-align: center;
  font-size: 14px; line-height: 1; margin-bottom: 10px;
  color:#666;
}
.text{
  text-align: center;
  font-size: 12px; line-height: 1; margin-bottom: 28px;
  color:#999;
}
.btn-btn{
  @include btn-box(110px, 40px, 14px); @extend .radius;
  margin: 0 auto 0;
  background-color: $blue; color:$white;
}
</style>