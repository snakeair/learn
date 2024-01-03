<template>
  <div>
    <classDom></classDom>
    <message :msg="messageTitle" @emitAdd="addFn" v-model:childMsg="childMsg" ></message>
    index
    <el-alert>  {{ childMsg }}</el-alert>
    <el-button v-auth="['btn']" @click="fatherFn">fatherMsg</el-button>
    
    <div class="box">
      <div class="child" ></div>
    </div>
    
  </div>
</template>

<script setup lang="ts" >
import {ref, reactive, provide } from 'vue'
import message from '@/components/_temp/message.vue'
import classDom from '@/components/_temp/class.vue'
import { ElMessage } from 'element-plus';

const messageTitle = ref<string>('this is props')

const addFn = (val:string) => {
  ElMessage(val)
}
const childMsg = ref<string>('')

const father = ref<string>('this is father msg')
const fatherFn = () => {
  provide('fatherMsg', father.value)
}

provide('fatherMsg', father.value)


const {val} = ['list1', 'list2', 'list3']
console.log(val);



</script>

<style lang="scss" scoped>
.box{
  width:200px; border: red solid 1px; height:20px;
  .child{
    width:100%; margin:10px; height:20px; box-sizing: border-box;
    background-color: rgba($color: #f60, $alpha: 0.6);
  }
}

</style>