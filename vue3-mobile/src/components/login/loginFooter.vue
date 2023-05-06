<template>
  <div>
    <div class="footer-link"><p>备案号：京ICP备15031491号-2</p><p><i class="module-icon icon-filing"></i>京公网安备11011102001293号</p></div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

.footer-link{
  @include flex(center);
  font-size: 14px;
  color:#afb3bf;
  p{
    margin-right: 26px;
  }
}
.icon-filing {
  display: inline-block;
  background-image: url('@/assets/images/icon-common.png');
  background-position: -100px 0;
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
</style>