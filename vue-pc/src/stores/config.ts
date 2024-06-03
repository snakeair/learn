import { defineStore } from "pinia";

type state = { msg: string; title: string };

export const configStore = defineStore("config", {
  state: () => {
    return {
      msg: String("this is layouts page store config"),
      title: String("首页"),
      count: Number,
    };
  },
  config: true,
  getters: {},
  actions: {
    actionMsg(msg: string) {
      this.msg = msg;
    },
  },
});
