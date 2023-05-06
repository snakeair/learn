<template>
  <section class="module-step" :class="'type-' + stepSize">
    <div class="step-01 ">提交资料</div>
    <span class="icomoon-xiangyou"></span>
    <div class="step-02 ">资料审核</div>
    <span class="icomoon-xiangyou"></span>
    <div class="step-03 ">认证成功</div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  stepSize: {
    type: Number,
    default: 1
  }
})

</script>

<style scoped lang="scss" >



$border: #e7e7e7;
$blue: #0e6fff;

.module-step{
  @include flex(left, center);
  padding:40px 0;
  border-bottom:1px solid $border;
  [class*='step']{
    &:before{
      content: '1';
      display: inline-block; font-weight: bold; text-align: center;
      width:28px; height:28px; border-radius: 50%; font-size: 16px; line-height: 28px; margin-right: 10px;
      border:2px solid #cfd5de; color:#cfd5de;
    }
    font-weight: bold;
    font-size: 14px;
    color:#bfbfbf;
    &.step-01:before{
      content: '1'
    }
    &.step-02:before{
      content: '2'
    }
    &.step-03:before{
      content: '3'
    }
  }
  [class^='icomoon'] {
    font-weight: bold;
    font-size: 14px; margin:0 35px;
    color:#cfd5de;
  }
  &.type-1{
    [class*='01'] {
      color:#333;
      &:before{
        color:$white; background-color: $blue; border-color: $blue;
      }
      &+span{
        color:#888;
      }
    }
  }
  &.type-2{
    @extend .type-1;
    [class*='01']{
      color:#666;
      &:before{
        opacity: .6;
      }
    }
    [class*='02'] {
      color:#333;
      &:before{
        color:$white; background-color: $blue; border-color: $blue;
      }
      &+span{
        color:#888;
      }
    }
  }
  &.type-3{
    @extend .type-2;
     [class*='02']{
      color:#666;
      &:before{
        opacity: .6;
      }
    }
    [class*='03'] {
      color:#333;
      &:before{
        color:$white; background-color: $blue; border-color: $blue;
      }
    }
  }
}
</style>