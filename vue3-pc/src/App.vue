<template>
  <el-config-provider  :zIndex="zIndex" :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup >
import { ref } from 'vue';
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { configStore } from './store/config';
const config = configStore()

let size = ref<any>('Default')
let zIndex = ref<number>(1000)

console.log(import.meta.env.VITE_BASE_URL);

window.addEventListener('resize', function () {
  config.getDevSizeFn()
})

</script>

<style>
</style>
