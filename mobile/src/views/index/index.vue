<template>
  <article class="index-index">
    <div class="load-cloud" v-if="loading" >
      <van-loading size="24" color="#039f6a"/>
    </div>
    <div class="tags" @click="layerShow='pact'" >规则<img src="@/assets/img/img04.png" class="icon" alt=""></div>
    <header class="page-title"></header>
    <div class="form-box">
      <div class="form-list">
        <span class="form-icon"><img class="icon-phone" src="@/assets/img/img05.png" alt=""></span>
        <input type="text" placeholder="请输入您的手机号" maxlength="11" v-model="phone"  class="phone input" >
      </div>
      <div class="form-list clearfix ">
        <span class="form-icon"><img class="icon-code" src="@/assets/img/img06.png" alt=""></span>
        <input type="number" placeholder="手机验证码" class="input code" v-model="code" >
        <button v-show="codeShow"  @click="getCodeFn" class="get-code">获取验证码</button>
        <button v-show="!codeShow" disabled class="wait-code">({{ codeTimer }}s)后获取</button>
      </div>
      <div class="form-btn" @click="submitFn"  >点击助力</div>
    </div>


    <div class="cloud" v-show="layerShow!== ''" ></div>
    <div class="layer-ok" v-show="layerShow == 'ok'" >
      <div @click="layerShow = ''" class="close"><img src="@/assets/img/img07.png" alt=""></div>
      <div class="layer-btn" @click="openAppFn" ></div>
    </div>

    <div class="layer-pact" v-show="layerShow == 'pact'" >
      <div @click="layerShow = ''" class="close"><img src="@/assets/img/img07.png" alt=""></div>
      <div class="show-text">
        <h3 class="text-title">活动规则：</h3>
        <p>1.分享好友助力+100积分</p>
        <p>2.使用发微信、打电话、导航等功能+10积分</p>
      </div>
    </div>

  </article>
</template>

<script lang="ts" setup >
import { ref } from 'vue';
import { showNotify, closeNotify, loadingProps } from 'vant';
import { useRoute } from 'vue-router';
import useCode from '@/hooks/useCode'
import phoneH from '@/hooks/phoneH';
import {$post} from '@/assets/js/axios'
import { configStore } from '@/store/config';

const {code, codeTimer, codeShow, codeFn} = useCode(60, 1, 1000)
const {phone, phoneFn} = phoneH()
const store = configStore()

const route = useRoute()


const layerShow = ref<string>('')
const loading = ref<boolean>(false)

const resCode = ref<number>()
const getCodeFn = async () => {
  if(!phoneFn()) {
    showNotify('手机号码错误')
    return;
  }
  loading.value = true;
  let url = `http://ytadmin-test.tmap.com.cn:8002/api/userSharing/sendCode`
  let data = {
    phone: phone.value
  }
  let res:any = await $post(url, data)
  loading.value = false;
  if(res.code == 200) {
    codeFn()
    store.code = parseInt(res.data)
  }
}


console.log(store.code);

const submitFn = async () => {
  if(!phoneFn()) {
    showNotify('手机号码错误')
    return;
  }
  console.log(code.value , resCode.value, 'code');
  if(!code.value ||  code.value !== store.code) {
     showNotify('验证码错误')
    return;
  }
  let userid = (route.query.userid as string).replace(/\"/g, '')
  let url = 'http://ytadmin-test.tmap.com.cn:8002/api/userSharing/register'
  let data = {
    phone: phone.value,
    userId: userid
  }
  loading.value = true;
  let res:any = await $post(url, data);
  loading.value = false;
  if(res.code == 200) {
    layerShow.value = 'ok'
  } else {
    showNotify(res.message)
  }
}


const openAppFn = () => {
  window.location.href = 'https://sj.qq.com/appdetail/com.yantu.tmap'
  
}

</script>

<style lang="scss" scoped >

.index-index{
  box-sizing: border-box; position: relative;
  width:100%; min-height:100vh; padding-top: vw(170); padding-bottom: vw(145);
  background: url('@/assets/img/img01.png') no-repeat center top /100% #cae9a1;
  .tags{
    display: inline-block; position: absolute;
    font-size: vw(24); height:vw(44); line-height: vw(44); padding:0 vw(27); right:0; top:vw(115); border-top-left-radius: vw(22); border-bottom-left-radius: vw(22);
    color:#fff; background-color: rgba(3, 98, 65, 0.6);
    .icon{
      height:vw(24); width:vw(24);
    }
  }
  .page-title{
    width:vw(598); height:vw(181); margin:0 auto 0;
    background: url('@/assets/img/img02.png') no-repeat center /100%;
  }
  .form-box{
    position: relative;
    width:vw(690); padding:vw(95) 0 vw(80); margin:vw(930) auto 0; border-radius: vw(30);
    background-color: #e7f9cf;
    &::after{
      content: '';
      display: block; position: absolute;
      width:vw(570); height:vw(135); margin-left: vw(60); top: vw(-90);
      background: url('@/assets/img/img03.png') no-repeat center /100%;
    }
    .form-list{
      width:vw(630); height:vw(73); margin:0 auto 0;
      &:first-of-type{
        margin-bottom: vw(20);
      }
      &:nth-of-type(2){
        margin-bottom: vw(80);
      }
      .form-icon{
        @include flex(center);
        position: absolute; box-sizing: border-box;
        height:vw(73); width:vw(85);
        .icon-phone{
          width:vw(25); height:vw(45);
        }
        .icon-code{
          width:vw(39); height:vw(39);
        }
      }
      .input{
        box-sizing: border-box;
        border-radius: vw(10); padding-left: vw(90); line-height: vw(73);  font-size: vw(30);
        background:#f7f7f7; color:#666;
        box-shadow: 3px 4px 5px 0px  rgba(4, 43, 30, 0.21); 
        transition: box-shadow .5s;
        &:focus{
          box-shadow: 3px 4px 5px 0px  rgba(4, 43, 30, 0.4); 
        }
        &.phone{
          width:100%; height:100%;
        }
        &.code{
          width:vw(400); height:100%;
        }
      }
      .get-code{
        text-align: center;display: block; float: right;
        width:vw(195); height:vw(73); line-height: vw(73); border-radius: vw(40); font-size: vw(30);
        background-color: #ff8f1e; color:#fff;
      }
      .wait-code{
        @extend .get-code;
        background-color: #ccc;
      }
    }
    .form-btn{
      @include btn-box(vw(630), vw(88), vw(42));
      font-weight: bold;
      border-radius: vw(44); margin:0 auto 0;
      background-color: #039f6a; color:#fff;
    }
  }
}

.layer-ok{
  position: fixed;
  width:vw(692); height:vw(851); left:vw(calc((750 - 692) / 2));   z-index:110; transform: translateY(-50%); top:40%;
  background: url('@/assets/img/img08.png') no-repeat center /100%;
  .layer-btn{
    position: absolute;
    width:vw(450); height:vw(100); bottom:vw(59); left:50%;
    transform: translateX(-50%);
  }
  .close{
    position: absolute;
    width:vw(74); height:vw(74); bottom:vw(-125); left:50%;
    transform: translateX(-50%);
    img{
      display: block;
      width: 100%; height: 100%; 
    }
  }
}

.layer-pact{
  position: fixed;
  width:vw(591); height:vw(850); left:vw(calc((750 - 590) / 2)); top:10vh;  z-index:110; 
  background: url('@/assets/img/img09.png') no-repeat center /100%;
  .close{
    position: absolute;
    width:vw(74); height:vw(74); bottom:vw(-125); left:50%;
    transform: translateX(-50%);
    img{
      display: block;
      width: 100%; height: 100%; 
    }
  }
  .show-text{
    box-sizing: border-box; overflow-y: auto;
    width:vw(482); height:vw(490); margin:vw(295) auto 0; padding:vw(50) vw(30);
    box-shadow: 0px 2px 4px 0px 	rgba(163, 111, 46, 0.2); 
    .text-title{
      font-weight: bold;
      font-size: vw(30); margin-bottom: vw(30);
      color:#754937;
    }
    p{
      font-size: vw(26); line-height: vw(46);
      color:#d49f6f;
    }
  }
}

</style>