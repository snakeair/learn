<template>
  <div>
    <el-alert>{{ store.default }}</el-alert>
    <el-alert> {{ props.msg }} </el-alert>
    <el-button @click="emitFn" >emit</el-button>
    <el-button @click="msgFn" >childMsg</el-button>
    <el-alert>{{ fatherMsg }}</el-alert>
  </div>
</template>

<script setup lang="ts">
import {ref, inject} from 'vue'
// 数据传递
import {configStore} from '@/store/config'
// NOTE store 方式 可跨组件
const store = configStore()
// NOTE prop 方式  父传子
const props =defineProps({
  msg: {
    type: String,
    default: ''
  }
})

// NOTE emit 方式 子传父
const emits = defineEmits(['emitAdd', 'update:childMsg'])
const emitFn = () => {
  emits('emitAdd', 'this is emit')
}

const msgFn = () => {
  emits('update:childMsg', 'this is child msg')
}


// NOTE inject方式
// INFO 父级使用方式：
// INFO provide('fatherMsg', '...')
// INFO 只能在setup中使用，日常使用比较少
const fatherMsg = inject('fatherMsg')
</script>

<style scoped>

</style>