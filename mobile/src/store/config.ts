import { defineStore } from "pinia";
import axios from "axios";
export const configStore = defineStore("config", {
  state: () => {
    return {
      size: Number(10),
      title: String(""),
      holder: String(""),
      devSize: "large", // 屏幕尺寸监听 pc pad  phone
      goods: {},
      code: Number(),
    };
  },
  persist: true,
  // 计算属性
  getters: {
    dbSize: (state) => {
      return state.size * 2;
    },
  },
  // actions 同步异步都可以，但是不会实时刷新视图，同步刷新需要使用async
  actions: {
    async getHolderFn() {
      let holder = await sessionStorage.getItem("holder");
      console.log(holder);

      if (holder && holder !== "") {
        this.holder = holder;
        return false;
      } else {
        return true;
      }
    },
    getDevSizeFn() {
      const width = document.body.clientWidth;
      if (width > 1200) {
        this.devSize = "large";
      } else if (width > 767) {
        this.devSize = "medium";
      } else {
        this.devSize = "small";
      }
      console.log(this.devSize);
    },
  },
});
