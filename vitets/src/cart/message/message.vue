<template>
  <transition name="message" @after-leave="clearFn">
    <p v-show="show" v-if="clear" :class="{error: type === 'error', success: type == 'success'}" class="message">
      {{msg}}</p>
  </transition>
</template>

<script lang="ts" setup >
import { ref, onMounted } from 'vue';

let props = defineProps({
  type: {
    type: String,
    default: 'success'
  },
  msg: {
    type: String,
    default:'this is default message'
  },
  timer: {
    type: Number,
    default: 3000
  }
})

let clear = ref<boolean>(true)
let clearFn = () => {
  clear.value = false;
}

let show = ref<boolean>(false);

let closeFn = ():void =>  {
  show.value = false;
};

onMounted(() => {
  show.value = true;
  let closeTime:any = null;
  closeTime =  setTimeout(() => {
    closeFn();
    clearTimeout(closeTime)
    closeTime = null;
  }, props.timer);
})




</script>

<style lang="scss" scoped>
//进入动画
.message-enter-active{
  animation: message .5s ease;
}

// 退出动画
.message-leave-active {
  animation: message .5s reverse ease;
}

// .message-enter-from,
// .message-leave-to {
//   transform: translateY(30px); opacity: 0; transform: translateX(-50%);
// }

@keyframes message {
  0%{
    opacity:0;  transform: translate(-50%, -100%)
  }
  100%{
    opacity:1; transform: translate(-50%, -50%);
  }
}

.message {
  position: fixed; text-align: center; z-index:200;
  top:50%; left: 50%; padding: 10px 20px 6px; line-height: 1.4;  border-radius: 4px; max-width:40vw; font-size: 14px; 
  background-color: #fff;  color:$white; border:1px solid #409eff; color:#2c73bb;
  box-shadow: 0px 0px 5px 5px rgba(149, 171, 204, 0.35);
  transform: translate(-50%, -50%);
  &.error{
    border-color:rgba(#f54c34, 0.6); color:#f54c34;
    box-shadow: 0px 0px 3px 3px rgba(#f54c34 , 0.25);
  }
}
</style>