<template>
  <div>
    页面错误
  
    <div btn  class="radius" @click="sizeFn" >size db</div>
    {{dbSize}}
    {{info}}
  </div>
</template>

<script lang="ts" setup >
import { defineComponent, ref, computed, watch  } from 'vue'

// components
let size = ref<number>(1)

let sizeFn = ():void => {
  size.value++
}

const dbSize = computed( () => {
  return size.value * 2
})

let info = ref<string>('第0次点击');

watch( size, () => {
  info.value = `第${size.value}次点击`
})


</script>

<style lang="scss" scoped>

.radius{
  color: $red2;
}
</style>