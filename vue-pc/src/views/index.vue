<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import {persistStore} from '@/stores/persist'
const persist = persistStore()

// persist.count = 10;
console.log(persist.count)
console.log(1)

</script>

<template>
  <section class="main" >
    <!-- <TheWelcome /> -->
    <!-- 网格容器 -->
    <div class="grid-container">
      <!-- 网格元素 -->
      <div class="grid-item one">One</div>
      <div class="grid-item two">Two</div>
      <div class="grid-item three">Three</div>
      <div class="grid-item four">Four</div>
      <div class="grid-item five">Five</div>
      <div class="grid-item six">Six</div>
    </div>

  </section>
</template>

<style lang="scss" scoped>
.main{
  width:100%;
}

.grid-container{
  @include grid(false, 5px, 3, 200px, 100px 100px 150px);
  width:100%;
}

.one {
  @include gridChild( 1,3,1,4 );
  background: #18dfbe;
}

.two {
  background: #ff49f8;
}

.three {
  background: #0bc530;
}

.four {
  background: #38d1d8;
}

.five {
  background: #edbf7e;
}

.six {
  background: #551ccE;
}

.grid-item {
  text-align: center;
  font-size: 200%;
  color: #fff;
}

</style>
