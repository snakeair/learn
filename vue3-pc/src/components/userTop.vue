<template>
  <header class="header-top">
    <div class="box">
      <div class="left">
        <a href="javascript:;"  class="back-index"><em class="common-icon home"></em>返回首页</a>
      </div>
      <div class="right">
        <span class="kf">在线客服</span>
        <span class="tel-400">服务热线：400-700-0065</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

const emit = defineEmits<{
  (e: 'backIndexEmit', sonValue: string): void
}>()

const backIndexFn = () => {
  emit('backIndexEmit', 'index')
}

</script>

<style scoped lang="scss" >
.header-top{
  height:34px; font-size: 12px;
  background-color: #fbfbfb; color:#626367;
  .box{
    @include flex(both, center);
    height:100%;
  }
  .kf{
    margin-right: 26px;
  }
  .back-index{
    .home{
      width:12px; height:12px; margin-right: 4px; margin-top: -4px;
      background-position: 0 -50px;
    }
  }
}
</style>