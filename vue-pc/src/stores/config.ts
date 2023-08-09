import { defineStore } from "pinia";

type state = {msg: string, title: string}

export const configStore = defineStore("config", {
  state: () => {
    return {
      msg: String("this is layouts page"),
      title: String('首页')
    };
  },
  getters: {},
  actions: {
    actionMsg(msg: string) {
      this.msg = msg;
    },
  },
},
{
  persist: {
    enabled: true
  }
}
);
