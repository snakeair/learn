<template>
  <div class="ai-test" >
    <div class="common-test" >
      <p class="test-title"><img src="@/assets/images/img-03.svg" alt="">AI 文案</p>
      <a-tabs v-model:activeKey="tabIndex">
        <a-tab-pane key="1">
          <template #tab>
            <span>
              <apple-outlined />
              创建
            </span>
          </template>
          <section class="form-box">
            <div class="form-list" >
              <a-form  :model="FormState"   layout="vertical"   @finish="handleFinish"  @finishFailed="handleFinishFailed"      >
                <a-form-item has-feedback  label="输入内容：" name="user">
                  <a-textarea  class="radius"
                      v-model:value="FormState.textarea"
                      placeholder="请输入关键信息，输入越多效果越好哦"
                      :auto-size="{ minRows: 6 }" ></a-textarea>
                </a-form-item>
                <a-form-item has-feedback  label="文案结构：" name="user">
                  <a-select  class="radio"  ref="select"  v-model:value="FormState.type"  style="width: 100%" @change="typeFn"   >
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="disabled" disabled>Disabled</a-select-option>
                    <a-select-option value="Yiminghe">yiminghe</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item has-feedback  label="语气（类似轻松、严肃、口语化等）：" name="user">
                  <a-select class="radio"  ref="select"  v-model:value="FormState.type1"  style="width: 100%" @change="typeFn"   >
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="disabled" disabled>Disabled</a-select-option>
                    <a-select-option value="Yiminghe">yiminghe</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item has-feedback  label="风格（类似软文、口播等）：" name="user">
                  <a-select  class="radio" ref="select"  v-model:value="FormState.type2"  style="width: 100%" @change="typeFn"   >
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="disabled" disabled>Disabled</a-select-option>
                    <a-select-option value="Yiminghe">yiminghe</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item>
                  <a-button
                    type="primary"
                    size="large"
                    html-type="submit" class="form-button" >生成文案</a-button>
                </a-form-item>
              </a-form>
            </div>
          </section>
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #tab>
            <span>
              <android-outlined />
              已保存 <a-tag v-if="saveSize > 0" >{{ saveSize }}</a-tag>
            </span>
          </template>
          Tab 2
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="ai-box" >
        <p class="test-title"><img src="@/assets/images/img-04.png" alt="">AI 文案</p>
        <div class="text-show" v-html="aiTest" >
        </div>
        <div class="none-show" v-if="noneShow" >
          <img src="@/assets/images/img-01.png" alt="">
          <p class="info">AI会在这里给你惊喜！</p>
        </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { fetchEventSource } from '@microsoft/fetch-event-source';

import type { Rule } from 'ant-design-vue/es/form';
import type { UnwrapRef } from 'vue';
import type { FormProps } from 'ant-design-vue';

const saveSize = ref<number>(0);
const tabIndex = ref<string>('1');

interface FormState {
  textarea: string;
  type: string;
  type1: string;
  type2: string;
}

const FormState = reactive<FormState>({
  textarea: '',
  type: '',
  type1: '',
  type2: '',
})

const typeFn = () => {

}

const type1Fn = () => {

}

const type2Fn = () => {

}


// const userRuleFn = async (_rule: Rule, value: string) => {
//   if (value === '') {
//     return Promise.reject('请输入您的账户');
//   }
//   return Promise.resolve();
// }

// const pwdRuleFn = async (_rule: Rule, value: string) => {
//   if (value === '') {
//     return Promise.reject('请输入您的密码')
//   }
//   return Promise.resolve();
// }

// const rules: Record<string, Rule[]> = {
//   user: [{ required: true, validator: userRuleFn, trigger: 'change' }],
//   password: [{ validator: pwdRuleFn, trigger: 'change' }],
// };


const handleFinish: FormProps['onFinish'] = values => {
  console.log(values, FormState);
};
const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
  console.log(errors);
};




const noneShow = ref<boolean>(false)

const aiTest = ref<string>('\n Thanks for your question.\n \n there are message')

const gptFn = () => {
  fetchEventSource("url-here", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    onmessage(msg) {
      console.log("message", msg.data); // this works - data is here!
      aiTest.value = msg.data; // this returns the error
    },
  });
}
</script>

<style scoped lang='scss' >

.ai-test{
  @include flex(both, top);
  width:100%;
  .test-title{
    @include flex(left, center);
    display: flex; font-weight: 500;
    font-size: 18px; height: 36px; line-height: 36px;
    img{
      margin-right: 4px; width:32px; height:32px;
    }
  }
}
.common-test{
  box-sizing: border-box;
  width:520px;  padding:20px; border-radius: 6px; height:670px;
  background-color: $white;
  
}


.ai-box {
  box-sizing: border-box;
  width:680px;  padding:20px; border-radius: 6px; height:670px;
  background-color: $white;
  .test-title{
    img{
      width:24px; height:24px; 
    }
  }
  .none-show{
    text-align: center; cursor:default ;
    padding-top: 200px;
    .info{
      font-size: 14px; margin-top: 6px;
      color:#D1D5DB; 
    }
  }
  .text-show{
    box-sizing: border-box;
    width:100%; height:calc(100% - 36px); padding:20px;
  }
}
.form-button{
  float: right;
  border-radius: 6px;
}

.radius{
  border-radius: 16px;
}

</style>

<style lang="scss" >
.common-test{
  .ant-select-selector{
    border-radius: 16px !important ;
  }
}
</style>