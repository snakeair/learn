<template>
  <div>
    <h3 class="title">{{title}} <span class="warning"><em class="icomoon-jingshi"></em>{{msg}}</span> </h3>
  </div>
</template>

<script setup lang="ts">

let props = defineProps({
  title: String,
  msg: String
})

</script>

<style scoped lang="scss" >

$border: #e7e7e7;

.title{
  font-weight: bold;
  font-size: 16px; line-height: 16px; padding-bottom: 18px;
  color:#333; border-bottom:1px solid $border;
  .warning{
    font-weight: normal;
    height:16px; font-size: 12px;  margin-left: 34px;
    color:#ff9703;
  }
  [class*='icomoon']{
    margin-right: 5px;
  }
}
</style>