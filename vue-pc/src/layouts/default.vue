<template>
  <div class="defualt-frame" >
    <header class="default-header">
      <el-header>Header</el-header>
    </header>
    <section class="user-container">
        <router-view></router-view>
    </section>
    <footer class="default-footer">
      footer
    </footer>
  </div>
</template>

<script setup lang="ts">
import { configStore } from '@/stores/config';
const config = configStore();

console.log(config.msg)

console.log(import.meta.env.VITE_APP_NAME)

</script>

<style scoped lang="scss">




.defualt-frame{
  position: relative; box-sizing: border-box;
  min-height:100vh;
  background-color: #f5f6f8;
}
.default-header{
  box-sizing: border-box;
  .user-info{
    position: relative;
    font-size: 14px; height:34px; line-height: 34px;
    color:#333;
    .icon{
      font-size: 12px;
    }
    .user-action{
      position: absolute; display: none;
      right:0;
      .li{
        display: block; text-align: center;
        width:104px; height:36px; line-height: 36px;
        color:#333; background-color: $white;
        &:hover{
          background-color: #ecf0f7;
        }
      }
    }
    &:hover{
      color:$blue;
      .user-action{
        display: block;
      }
    }
  }
}
.user-container{
  @include flex(left, top); 
  align-items: stretch;
  width: 1200px; margin:11px auto 38px;
  .user-main{
    width: 1000px;
  }
}
.default-footer{
  box-sizing: border-box;
}
</style>