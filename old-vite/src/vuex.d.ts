import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { State } from "./store";

// 模块扩展
// this.$store的强类型的声明
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
