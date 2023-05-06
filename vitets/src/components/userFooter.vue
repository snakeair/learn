<template>
  <section id="footer" class="common-footer">
    <section class="footer">
      <div class="footer-link">
        <div class="link">
          <dl class="link-list">
            <dt class="title">关于细软</dt>
            <dd class="link"><a href="javascript:void(0);" target="_blank">公司简介</a></dd>
            <dd class="link"><a href="javascript:void(0);" target="_blank">企业文化</a></dd>
            <dd class="link"><a href="javascript:void(0);" target="_blank">发展历程</a></dd>
            <dd class="link"><a href="javascript:void(0);" target="_blank">服务案例</a></dd>
            <dd class="link"><a href="javascript:void(0);" target="_blank">联系我们</a></dd>
            <dd class="link"><a href="javascript:void(0);" target="_blank">法律声明</a></dd>
            <dd class="link"><a href="javascript:void(0);" target="_blank">投诉建议</a></dd>
          </dl>
          <dl class="link-list">
            <dt class="title">平台工具</dt>
            <dd class="link"><a href="javascript:void(0);" target="_blank">知产研究院</a></dd>
            <dd class="link"><a href="http://www.gbicom.cn/" target="_blank">中华商标超市</a></dd>
            <dd class="link"><a href="http://patent.gbicom.cn/" target="_blank">技术转移平台</a></dd>
            <dd class="link"><a href="https://shop.ciprun.com/" target="_blank">电子商务平台</a></dd>
            <dd class="link"><a href="http://www.ciprun.com/cx" target="_blank">知产查询工具</a></dd>
          </dl>
          <dl class="link-list">
            <dt class="title">合作律所</dt>
            <dd class="link"><a href="http://www.ciprunlaw.com/" target="_blank">中细软律师事务所</a></dd>
            <dd class="link"><a href="http://www.zxrlaw.com/" target="_blank">四川中法律师事务所</a></dd>
            <dd class="link"><a href="http://qhlaw.ciprun.com/" target="_blank">广东前海律师事务所</a></dd>
          </dl>
        </div>
        <div class="code">
          <h2 class="tel-400">400-700-0065</h2>
          <p>全国免费服务热线</p>
          <div class="qr-code">
            <dl class="code-img">
              <dt class="img"><img src="@/assets/images/img-footer-07.jpg" alt="" srcset=""></dt>
              <dd>细软在线电商小程序</dd>
            </dl>
            <dl class="code-img">
              <dt class="img"><img src="@/assets/images/img-footer-08.jpg" alt="" srcset=""></dt>
              <dd>细软知识产权公众号</dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="friendly-link">友情链接：<a href="javascript:void(0);" target="_blank">国家知识产权局</a><em class="sep"></em><a
            href="javascript:void(0);" target="_blank">国家商标局</a><em class="sep"></em><a href="javascript:void(0);"
            target="_blank">国家版权局</a></div>
        <div class="filing-link">
          <p>备案号：京ICP备15031491号-2</p>
          <p><i class=" module-icon icon-filing"></i>京公网安备11011102001293号</p>
        </div>
        <div class="else-link"><a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"><img
              src="@/assets/images/img-footer-06.jpg" alt="" srcset=""></a><a href="https://www.12377.cn/"
            target="_blank"><img src="@/assets/images/img-footer-01.jpg" alt="" srcset=""></a><a
            href="https://www.shdf.gov.cn/shdf/channels/740.html" target="_blank"><img
              src="@/assets/images/img-footer-02.jpg" alt="" srcset=""></a><a
            href="https://www.baidu.com/s?wd=%E4%B8%AD%E7%BB%86%E8%BD%AF%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8@v"
            target="_blank"><img src="@/assets/images/img-footer-03.jpg" alt="" srcset=""></a><a
            href="javascript:void(0);" target="_blank"><img src="@/assets/images/img-footer-04.jpg" alt=""
              srcset=""></a><a href="javascript:void(0);" target="_blank"><img src="@/assets/images/img-footer-05.jpg"
              alt="" srcset=""></a></div>
      </div>
    </section>
  </section>

</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">


.common-footer {
  background-color: #37425e;
  padding: 50px 0 20px;
  font-size: 14px;

  a {
    color: #afb3bf;
  }

  .footer {
    width: 1200px;
    margin: auto;
    color: $white;

    .footer-link {
      margin-bottom: 25px;
      display: flex;
      justify-content: space-between;

      div.link {
        display: flex;

        .link-list {
          margin-right: 130px;

          dt.title {
            margin-bottom: 34px;
          }

          dd.link {
            margin-bottom: 20px;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      div.code {
        >p {
          margin-left: 24px + 28px + 9px;
          color: #afb3bf;
          margin-bottom: 24px;
        }

        .tel-400 {
          margin-left: 24px;
          line-height: 29px;
          font-size: 22px;
          font-weight: bold;

          &::before {
            content: '';
            display: inline-block;
            background: url('@/assets/images/icon-common.png') no-repeat 0 0;
            width: 28px;
            height: 29px;
            margin-right: 9px; margin-bottom: -4px;
          }
        }

        .qr-code {
          display: flex;
          color: #afb3bf;
          padding-right: 7px;

          .code-img {
            text-align: center;
            margin-left: 24px;

            dt.img {
              margin-bottom: 15px;
            }
          }
        }
      }
    }

    .footer-bottom {
      border-top: rgba($color: #f2f6fa, $alpha: .08) 1px solid;
      padding-top: 20px;
      color: #afb3bf;

      >div {
        margin-bottom: 17px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .sep {
        width: 2px;
        height: 12px;
        background-color: #afb3bf;
        margin: 0 15px;
        display: inline-block;
      }

      .filing-link {
        .icon-filing {
          display: inline-block;
          background-image: url('@/assets/images/icon-common.png');
          background-position: -100px 0;
          width: 18px;
          height: 18px;
          margin-right: 5px;
        }

        >p {
          display: inline-block;
          margin-right: 25px;
        }
      }

      .else-link {
        >a {
          display: inline-block;
          margin-right: 35px;
        }
      }
    }
  }
}
</style>