<template>
  <article>
    <section class="index-pages" :class="{up: indexShow.up}" v-show="indexShow.show"  >
      <header class="logo-box"><img class="logo" src="@/assets/images/logo.png" alt=""></header>
      <header class="show-main" >
        <div class="img-box left  "><img src="@/assets/images/img00.png" alt=""></div>
        <div class="img-box right  "><img src="@/assets/images/img01.png" alt=""></div>
        <div class="img-box size   "><img src="@/assets/images/img02.png" alt=""></div>
        <div class="img-box footer   "><img src="@/assets/images/img03.png" alt=""></div>
      </header>
      <div class="btn-main">
        <div btn @click="upFn(indexShow); showFn(imgShow);" class="red-big-btn animate__animated animate__zoomIn animate__delay-3s animate__fast">MS灵眸大赏</div>
        <div btn class="red-big-btn animate__animated animate__zoomIn animate__delay-4s animate__fast">现场信息</div>
        <div btn class="red-big-btn animate__animated animate__zoomIn animate__delay-5s animate__fast">图片直播</div>
        <div class="flex-box"> 
          <div btn class="red-small-btn animate__animated animate__backInLeft animate__delay-5s animate__fast">行业报告</div>
          <div btn class="red-small-btn animate__animated animate__backInRight animate__delay-5s animate__fast">直播回放</div>
        </div>
      </div>
      <div class="ecode-box animate__animated animate__fadeIn animate__delay-5s" >
        <div class="img-box">
          <img src="@/assets/images/img06.png" alt="">
        </div>
        <p class="tags">扫码关注了解更多咨询</p>
      </div>
    </section>

    <!--pdf-list-->
    <section class="pages-01">
      <div class="back-btn"></div>
      <div class="pdf-list">
        <div class="pdf-box" v-for="item in 4" :key="item" :class="{left: item % 2 == 0}" >
          <div class="text">《2022灵眸年鉴》</div>
          <div class="title"><img class="book" src="@/assets/images/img13.png" alt=""></div>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import timer from '@/hooks/timer'

const {timerFn} = timer()


let indexShow = reactive({
  up:false,
  down: false,
  show: true
})

let imgShow = reactive({
  up: false,
  down: true,
  show: false,
})
let listShow = reactive({
  up: false,
  down: true,
  show: false,
})


const upFn = (page: typePage) => {
  page.up = true;
  page.down = false;
  timerFn({
    fn: () => {
      page.show = false;
    },
    time: 600
  })
}

const showFn = (page: typePage) => {
  page.show = true;
  timerFn({
    fn: () => {
      page.up = false;
      page.down = false;
    },
    time: 100
  })
}

const downFn = (page: typePage) => {
  page.down = true;
  page.up = false;
  timerFn({
    fn: () => {
      page.show = false;
    },
    time: 600
  })
}



</script>

<style scoped lang="scss" > 

[class|=pages],
.index-pages{
  position: absolute; overflow-x: hidden; overflow-y: auto;
  left:0; top:0; z-index:50; width:100vw; height:100%;
  transition: transform 500ms ;
  &.up{
    transform: translateY(-100vh)
  }
  &.down{
    transform: translateY(100vh)
  }
}


.index-pages{
  @include flex(both, center, true);
  box-sizing: border-box; 
  width:100vw; height:100vh; padding:20px; z-index:90;
  background: #000 url('@/assets/images/img05.png') no-repeat bottom center; background-size: 100%;
  &.leave{
    transform: translateY(-100vh)
  }
  .logo-box{
    @extend .img-box;
    width:vw(435); height:vw(40); margin:0 auto; padding-bottom: 10px;
    .logo{
      display: block;
      width:100%;
    }
  }
  .show-main{
    position: relative;
    width:vw(600); height:vw(285); margin:0 auto 10px;  
    .left{
      position: absolute;
      width:vw(382); height:vw(154); top:0; left:0; 
      animation: left 0.8s  ease-in-out;
    }
    .right{
      position: absolute;
      width:vw(187); height:vw(93); right:0; top:0; 
      animation: right 1s  ease-in-out ;
    }
    .size{
      position: absolute;
      width:vw(594); height:vw(100); left:0; bottom:vw(70); 
      animation: right 1s  ease-in-out ;
    }
    .footer{
      position: absolute;
      width:size(595); height:vw(50); bottom:0; left:0; 
      animation: right 1.5s  ease-in-out ;
    }
  }
  .btn-main{
    width:vw(600); margin:0 auto 10px;  
    .red-big-btn{
      text-align: center; font-weight: bold; box-sizing: border-box;
      width:100%; height:vw(70); line-height: vw(70); border-radius: vw(35); font-size: vw(28); margin-bottom: vw(50);
      background: #f71435 no-repeat right center; background-size: vw(70); color:$white;
      &:first-of-type{
        background-image: url('@/assets/images/img07.png');
      }
      &:nth-of-type(2){
        background-image: url('@/assets/images/img08.png');
      }
      &:nth-of-type(3){
        background-image: url('@/assets/images/img09.png');
      }
    }
    .flex-box{
      @include flex(both, center);
    }
    .red-small-btn{
      @extend .red-big-btn;
      width:vw(286); padding-right: vw(50); margin-bottom: 0;
    }
  }
  .ecode-box{
    @include flex(center);
    margin-top: vw(60); width:100%;
    .img-box{
      width:vw(150); height:vw(150);
    }
    .tags{
      text-align: center;
      width:100vw; font-size: vw(16);  padding-top: 4px;
      color:$white;
    }
  }
}



// pdf-list
.pages-01{
  width:100vw; height:100%; z-index:200;
  background: #000 url('@/assets/images/img05.png') no-repeat bottom center /100%;
  .back-btn{
    margin-left: vw(50); margin-top: vw(50);
  }
  .pdf-list{
    padding-top: vw(80);
    .pdf-box{
      overflow: hidden;
      margin-bottom: vw(20);
      .title{
        @include flex(center);
        float: right; position: relative;
        width:vw(150); height:vw(210);
        background: url('@/assets/images/img14.png') no-repeat  center /100%;
        .book{
          width:vw(124); height:vw(190);
        }
        &:after{
          content: '';
          position: absolute; display: block;
          width:100%; height:100%; opacity: 0; left:0; top:0; z-index:10;
        }
      }
      .text{
        float: right; text-align: center; font-weight: bold;
        width:vw(530); height:vw(90); line-height: vw(90); font-size: vw(28); margin-top: vw(60);
        background-color: $red; color:$white;
      }
      &.left{
        .title,
        .text{
          float: left;
        }
      }
    }  
  }
}


.back-btn{
  width:vw(50); height:vw(50); 
  background: url('@/assets/images/img16.png') no-repeat center /100%; 
}


@keyframes left {
  0%{
    transform:translateX(-70vw) scale(0.3, 0.3);
  }
  100%{
     transform:translateX(0) scale(1, 1); 
  }
}

@keyframes right {
  0%{
    transform:translateX(70vw) scale(0.3, 0.3); 
  }
  100%{
     transform:translateX(0) scale(1, 1); 
  }
}

</style>