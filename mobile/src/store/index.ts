import { defineStore } from "pinia";
interface usersTs {
  TrueName: string;
  Mobile: string;
  id: string;
}

export const indexStore = defineStore("main", {
  state: () => {
    return {
      msg: "hello",
      channel: "ceshi1",
      users: {} as usersTs,
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
