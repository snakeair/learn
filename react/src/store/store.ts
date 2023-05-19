import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userStore";
import { configReducer } from "./configStore";
import userApi from "./userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// INFO: reducer: [rɪ'djuːsə] 还原器
// NOTE: 用于创建 store 对象
// NOTE: reducer中的键名为导出名
const store = configureStore({
  reducer: {
    user: userReducer,
    config: configReducer,
    // NOTE: 中括号表示这是个这个参数是属性名
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userApi.middleware);
  },
});

// NOTE 设置之后支持 refetchOnFocus
setupListeners(store.dispatch);

export default store;

export type tsState = ReturnType<typeof store.getState>;
