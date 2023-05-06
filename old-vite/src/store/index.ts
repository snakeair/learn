import { InjectionKey } from "vue";
import { createStore } from "vuex";
import user from "./login";
import type { userState } from "./login";

// 声明key类型
export const key: InjectionKey<State> = Symbol();

export type State = {
  counter: number;
  user?: userState; // userState 从user引入
};

export default createStore({
  state: {
    counter: 0,
  },
  mutations: {
    add(state) {
      state.counter++;
    },
  },
  modules: {
    user,
  },
});
