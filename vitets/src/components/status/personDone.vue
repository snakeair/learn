<template>
  <div>
    <dl class="wait-module">
      <dt class="img-box"><img src="@/assets/images/status/img-03.png" alt=""></dt>
      <dd class="msg">您已通过实名认证</dd>
    </dl>
    <ul class="holder-msg" >
      <li>真实姓名：张**</li>
      <li>身份证号：110***********1234</li>
      <li>认证日期：2022-6-20</li>
    </ul>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss" >
.img-box{
  width:50px; height:55px; margin: 60px auto 20px; 
}
.msg{
  text-align: center;
  font-size: 14px; line-height: 1; margin-bottom: 36px;
  color:#999;
}
.holder-msg{
  @extend .radius;
  box-sizing: border-box;
  width:320px; height:160px; margin:0 auto 0; padding-left: 50px; padding-top: 38px;
  background: url("@/assets/images/status/bg-02.png") no-repeat center;
  li{
    font-size: 14px; line-height: 1; margin-bottom: 24px;
    color:#666;
  }
}
</style>