import { createApp, Directive } from "vue";
import App from "./App.vue";
import "@/assets/sass/reset.scss"; // 初始化样式
import "animate.css";
import router from "./router";
import pinia from "./store/store";
import auth from '@/directive/auth'

// 使用自动引入的时候部分组件会出现样式丢失，所以在这里全局引入，但是不知道打包的时候会不会重复打包
import "@/assets/sass/element.scss";

// import UI from "@/cart/index";

const app = createApp(App);

app.use(router);
app.use(pinia);
// app.use(auth);
app.directive('auth', auth)
// app.use(UI);
app.mount("#app");
