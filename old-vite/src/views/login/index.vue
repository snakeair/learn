<template>
  <div class="login_pages">
    <h3 class="header"><img src="../../assets/images/login/logo.png" alt="" /></h3>
    <div class="login_banner">
      <div class="login_box" @keyup.enter="loginFn">
        <h3 class="login_title">欢迎登录</h3>
        <p class="login_title2">云平台后台管理系统</p>
        <div class="inp_list">
          <div class="input_box">
            <img class="icon" src="../../assets/images/login/account.png" alt="" />
            <input
              placeholder="请输入EHR账号"
              v-model="ruleForm.login_user"
              maxlength="11"
              class="inp_name"
              type="text"
            />
            <div class="bg"></div>
          </div>
        </div>
        <div class="inp_list">
          <div class="input_box">
            <img
              class="icon"
              src="../../assets/images/login/password.png"
              alt=""
            />
            <input
              placeholder="请输入密码"
              v-model="ruleForm.login_pass"
              class="inp_pwd"
              type="password"
            />
            <div class="bg"></div>
            <p v-show="err != ''" class="err">* {{ err }}</p>
            <a
              class="reset"
              href="http://ehr.iprun.com/mchr/login"
              target="_blank"
              >忘记密码</a
            >
          </div>
        </div>

        <div class="login_btn" @click="loginFn" type="primary">
          登录
          <div class="bg"></div>
        </div>
      </div>
    </div>
    <footer>
      <span>2018-2028 中细软集团有限公司 版权所有</span>
      <span>北京市房山区长阳路中细软知识产权科技园中细软大厦 </span>
      <span>京ICP备 15031491号-2 010-53949000</span>
    </footer>
    <footer>
      <span
        ><img
          src="../../assets/images/login/one.jpg"
          alt=""
        />国际商标协会会员</span
      >
      <span
        ><img src="../../assets/images/login/two.png" alt="" />高新企业认证</span
      >
      <span
        ><img
          src="../../assets/images/login/three.png"
          alt=""
        />中国商标战略创新奖</span
      >
      <span
        ><img
          src="../../assets/images/login/four.png"
          alt=""
        />中华商标协会会员</span
      >
      <span
        ><img
          src="../../assets/images/login/five.png"
          alt=""
        />知识产权管理研究中心</span
      >
    </footer>
  </div>
</template>

<script lang="ts" src="./index.ts" ></script>

<style lang="scss" scoped  >
@import '../../assets/sass/base.scss';
.login_pages {
  width: 100%;
  height: 100vh;
  min-height: 680px;
  background: url("../../assets/images/login/login_bg.jpg") no-repeat center center;
  position: relative;
  .header {
    width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
  }
  .login_box {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 588px;
    height: 588px;
    // padding-top: 122px;
    box-sizing: border-box;
    transform: translate(-50%, -40%);
    .inp_list ~ .inp_list {
      margin-top: 20px;
    }
    .inp_list {
      .input_box {
        margin: 0 auto;
        width: 358px;
        height: 52px;
        line-height: 52px;
        padding-left: 29px;
        position: relative;
        .bg {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          // background: linear-gradient(to right,#3b2788,#35303a);
          background-color: #3d33a1;
          border-radius: 44px;
          opacity: 0.7;
          z-index: -1;
        }
        .icon {
          width: 18px;
        }
        input {
          box-sizing: border-box;
          width: 282px;
          padding-left: 10px;
          font-size: 16px;
          border: none;
          line-height: 52px;
          background: none;
          color: white;
        }
      }
    }

    .img_code {
      float: right;
      cursor: pointer;
      box-sizing: border-box;
      width: 103px;
      height: 38px;
      margin-left: 10px;
      border: 1px solid #ccc;
    }
    .login_btn {
      display: block;
      width: 358px;
      height: 52px;
      line-height: 52px;
      margin: 0 auto;
      margin-top: 50px;
      text-align: center;
      font-size: 20px;
      position: relative;
      color: #ffffff;
      cursor: pointer;
      .bg {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(to right, #5b99de, #162fb4);
        border-radius: 30px;
        z-index: -1;
        opacity: 0.7;
      }
    }
    .login_title {
      font-size: 26px;
      text-align: center;
      color: #ffffff;
    }
    .login_title2 {
      margin-top: 10px;
      margin-bottom: 48px;
      font-size: 18px;
      text-align: center;
      color: #ffffff;
    }
    .err {
      position: absolute;
      text-align: left;
      padding-left: 5px;
      left: 0;
      font-size: $size;
      width: 284px;
      color: #f33;
    }
    .reset {
      position: absolute;
      right: 18px;
      font-size: 14px;
      color: #9190ac;
    }
  }
  footer:first-of-type {
    width: 1200px;
    position: absolute;
    bottom: 65px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    color: #949295;
    text-align: center;
    span {
      margin-right: 25px;
    }
  }
  footer:last-of-type {
    width: 1200px;
    position: absolute;
    bottom: 31px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    color: #949295;
    text-align: center;
    span {
      // display: block;
      padding-right: 20px;
      color: #999999;

      img {
        margin-right: 7px;
      }
    }
    span ~ span {
      border-left: 1px solid #eeeeee;
      padding-left: 20px;
    }
  }
}
.nav-box {
  position: fixed;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99998;
  padding-top: 100px;
  background-color: #000;
  transition: all 0.5s;
  &.cur {
    height: 100%;
  }
  a {
    display: block;
    text-align: center;
    position: relative;
    font-weight: bold;
    width: 200px;
    font-size: 24px;
    margin: 0 auto 40px;
    line-height: 1.5;
    color: #fff;
    transition: all 0.5s;
    &:hover {
      text-decoration: underline;
      color: #f8a310;
      &:after {
        width: 100%;
      }
    }
  }
}
</style>