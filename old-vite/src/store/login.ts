import { Module } from "vuex";
import { State } from "./";
import { user } from "../types";

// 统一声明state元素
const loginType = {
  user: {} as user,
};

// 导出state元素类型
export type userState = typeof loginType;

export default {
  namespaced: true,
  state: loginType,
  mutations: {
    $loginFn(state, data: user) {
      state.user = data;
    },
    $getLoginFn(state) {
      console.log(state.user);
    },
  },
  actions: {
    initLogin({ commit }, data) {
      commit("$loginFn", data);
    },
  },
} as Module<userState, State>;
