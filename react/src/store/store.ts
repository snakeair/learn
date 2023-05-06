import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userStore";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

export type tsState = ReturnType<typeof store.getState>;
