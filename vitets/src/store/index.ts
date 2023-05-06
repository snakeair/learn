import { defineStore } from "pinia";

export const indexStore = defineStore("main", {
  state: () => {
    return {
      msg: "hello",
    };
  },
  getters: {
    // 和vue中的computed一样
  },
  actions: {
    actionMsg(msg: string) {
      this.msg = msg;
    },
  },
});
