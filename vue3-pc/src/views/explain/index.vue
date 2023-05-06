<template>
  <div class="explain-page" >
    <header class="page-header">
        <div class="tab-btn" :class="{cur: tabIndex == 1}" @click="tabFn(1)" >参与须知</div>
        <div class="tab-btn" :class="{ cur: tabIndex == 2}" @click="tabFn(2)">互动玩法</div>
    </header>
    <div class="back-btn"></div>
    <section class="show-main-one"  v-show="tabIndex == 1">
      <div class="img-show"></div>
      <div class="img-show"></div>
      <div class="img-show"></div>
      <div class="img-show ">
        <h3 class="addr-title"><img class="img" src="@/assets/images/explain/title.png" alt=""></h3>
        <div class="img-box">
          <img class="img" src="@/assets/images/explain/img040.jpg" alt="">
        </div>
      </div>
    </section>
    <section class="show-main-two" v-show="tabIndex == 2" >
      <div class="img-show"></div>
      <div class="img-show prize-floor-main">
        <h4 class="prize-title"></h4>
        <div class="text">
          <p>参会伙伴可以在<span class="red big">签到处</span>，</p>
          <p>领取<span class="red big">集章册</span>一份（每人仅限一份），</p>
          <p>完成相应互动任务，</p>
          <p>便能参与<span class="red">「奋进的魔客」</span>游戏，</p>
          <p>及<span class="red">「扭蛋」</span>互动，</p>
          <p>有机会获得<span class="red big">千元大奖</span>及<span class="red big">MS大礼包</span></p>
        </div>
        <div class="prize-list">
        <dl class="prize-box" v-for="item in 6" key="item"  >
          <dt class="img-box"><img src="" class="img" alt=""></dt>
          <dd class="prize-name">ihpne 14 pro max</dd>
        </dl>
        </div>
      </div>
      <div class="img-show"></div>
      <div class="img-show"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
const tabIndex = ref<number>(2)
const tabFn = (size:number):void => {
  tabIndex.value = size
}


</script>

<style scoped lang="scss" >
.explain-page{
  min-height:100vh;
  background-color: #030303;
  .back-btn{
    position: absolute;
    z-index:20;width:vw(50); height:vw(50); margin-top: vw(20); margin-left: vw(50);
    background: url('@/assets/images/img16.png') no-repeat center; background-size: 100% 100%;
  }
}
.page-header{
  overflow: hidden;
  width:100vw;
  .tab-btn{
    float: left; box-sizing: border-box; text-align: center; font-weight: bold;
    width:50%; height: vw(88); line-height: vw(84); font-size: vw(28);
    border:2px solid $red; color:$white;
    &.cur{
      background-color: $red;
    }
  }
}

.show-main-one{
  .img-show{
    width:100vw;
    background: no-repeat top; background-size: 100%;
    &:first-of-type{
      height:vw(640);
      background-image: url('@/assets/images/explain/img_01.jpg');
    }
    &:nth-of-type(2){
      height:vw(786);
      background-image: url('@/assets/images/explain/img_02.jpg');
    }
    &:nth-of-type(3){
      height:vw(2095);
      background-image: url('@/assets/images/explain/img_03.jpg');
    }
  }
  .addr-title{
    position: relative;
    width:vw(690);  margin:0 auto 0; z-index:20;
    .img{
      display: block;
      width:100%;
    }
  }
  .img-box{
    position: relative;
    width:vw(690); margin:0 auto 0; z-index:10; padding-top: vw(30); margin-top: calc(vw(45) * -1);
    background-color: $white;
    .img{
      width:100%;
    }
  }
}

.show-main-two{
  .img-show{
    width:100vw;
    background: no-repeat top; background-size: 100%;
    &:first-of-type{
      height:vw(637); margin-bottom: vw(50);
      background-image: url('@/assets/images/explain/img_05.jpg');
    }
    &:nth-of-type(3){
      height:vw(2958);
      background-image: url('@/assets/images/explain/img_07.jpg');
    }
    &:nth-of-type(4){
      height:vw(443);
      background-image: url('@/assets/images/explain/img_08.jpg');
    }
  }

  .prize-floor-main{
    width:vw(690); margin:0 auto 0; border-radius: vw(45); height:auto; padding-top: vw(70); margin-bottom: vw(20);
    border:1px solid $red;
    .prize-title{
      position: absolute;
      width:vw(690); height:vw(88); margin:calc(vw(120) * -1) auto 0; 
      background: url('@/assets/images/explain/title02.png') no-repeat center ; background-size: 100%;
    }
    .text{
      text-align: center; 
      font-size: vw(28); margin-bottom: vw(40);
      color:$white;
      p{
        line-height: 1.5;
      }
      .red{
        color:$red;
      }
      .big{
        font-weight: bold;
        font-size: vw(35);
      }
    }

    .prize-list{
      @include flex(both, top);
      width:vw(630); margin:0 auto 0; 
      .prize-box{
        width:vw(184); margin-bottom: vw(40);
        .img-box{
          overflow: hidden;
          width:vw(184); height:vw(184); border-radius: 50%;
          background-color: #606060;
          .img{
            width:100%;
          }
        }
        .prize-name{
          text-align: center;
          font-size: (28);  padding-top: size(10);
          color:$white;
        }
      }
    }
  }
}


</style>