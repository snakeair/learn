import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userStore";
import { configReducer } from "./configStore";

// INFO: reducer: [rɪ'djuːsə] 还原器
// NOTE: 用于创建 store 对象
// NOTE: reducer中的键名为导出名
const store = configureStore({
  reducer: {
    user: userReducer,
    config: configReducer,
  },
});

export default store;

export type tsState = ReturnType<typeof store.getState>;
