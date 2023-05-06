import { createVNode, render } from "vue";
import VNmessage from "./message.vue";

const $message = (options: MSGoptions): void => {
  let opt = {
    ...options,
  };
  /**
   * createVNode 将dom挂载到vue上变成一个虚拟节点，然后使用render渲染成真实节点
   */

  let box = document.createElement("div");
  let vm = createVNode(VNmessage, opt as any);
  render(vm, box); // 将vm 挂载到box上面
  /**
   *  下面的内容是奖一个函数挂载到了vm的props上面然后点vm中使用emit执行dom的清理工作，
   *  但是我不知道为啥函数挂载到props上面可以使用emit调用
   */
  // // 在vm的props上面挂载一个方法，用于删除添加的dom，可以在组件中使用$emit调用
  // vm.props!.onClearFn = () => {
  //   // 将之前在box上面挂载的vm给null掉
  //   render(null, box);
  // };

  // 挂载box下面的第一个元素节点 如果是null那就删除了这个节点
  if (box.firstElementChild !== null) {
    document.body.appendChild(box.firstElementChild);
  }
};

export default $message;
