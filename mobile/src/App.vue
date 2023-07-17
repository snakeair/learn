<template>
    <router-view></router-view>
</template>

<script lang="ts" setup >
import { ref } from 'vue';
import { configStore } from './store/config';


const config = configStore()
window.addEventListener('resize', function () {
  config.getDevSizeFn()
})

console.log(import.meta.env)

</script>

<style>
</style>
