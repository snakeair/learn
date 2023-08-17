import { defineStore } from "pinia";

type state = {msg: string, title: string}

export const configStore = defineStore("config", {
  state: () => {
    return {
      msg: String("this is layouts page"),
      title: String('首页'),
      count: Number
    };
  },
  persist: true,
  getters: {},
  actions: {
    actionMsg(msg: string) {
      this.msg = msg;
    },
  },
});
