import { createApp } from "vue";
import pinia from "@/stores/store";
import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";

import "./assets/element.css";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(ElementPlus, { size: "default", zIndex: 1000 });

app.mount("#app");
