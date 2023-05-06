<template>
  <div class="error">
    <h3>你无权访问此页面</h3>
    <p>{{size}}后返回首页</p>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {  useRouter } from 'vue-router';
const router = useRouter();

let size = ref<number>(3);

let timer:any = setInterval(() => {
  if(size.value > 0) {
    size.value--
  } else {
    clearInterval(timer);
    timer = null
    router.push({
      path: '/'
    })
  }
}, 1000)

</script>

<style scoped lang="scss" >
.error{
  text-align: center;
}
</style>