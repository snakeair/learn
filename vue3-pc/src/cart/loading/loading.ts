import { createApp } from "vue"; // 导⼊ createApp ⽅法
import Loading from "./loading.vue"; // 导⼊我们写好的 loading 组件
const loadingDirective = {
  mounted(el: any, binding: any) {
    /**
     * el 组件需要挂载的dom
     * binding 传过来的参数
     */
    // 创建app对象并将load组件挂载到app上面
    const app = createApp(Loading);

    // 创建⼀个div节点，并挂载到app上面
    const instance = app.mount(document.createElement("div"));

    // 因为在updated也需要⽤到 instance 所以将 instance 添加在 el 上
    // 在 updated中 通过el.instance 可访问到
    el.instance = instance;

    // 如果传过来的是对象可以使用 binding.value 调用
    // 判断传过来的值，然后挂载load
    if (binding.value) {
      el.appendChild(el.instance.$el);
    }

    // 编辑loading提供的文字
    el.instance.msg = "loading";
  },

  updated(el: any, binding: any) {
    // 在此判断是否有title值
    el.instance.msg = "loading";

    // 如果value的值有改变，那么我们去判断进⾏操作
    if (binding.value !== binding.oldValue) {
      // 三元表达式 true 插入 false 移除
      binding.value
        ? el.appendChild(el.instance.$el)
        : el.removeChild(el.instance.$el);
    }
  },
};
export default loadingDirective; // 导出

const relative = "g-relative"; // g-relative 全局相对定位样式名称
const hidden = "g-hidden"; // g-hidden 全局禁止/隐藏滚动样式名称
