import { createSlice, PayloadAction } from "@reduxjs/toolkit";
/**
 * PayloadAction: action的ts声明
 */

interface tsUser {
  [key: string]: any;
  user: string;
  phone: number | string;
  isLogin: boolean;
}

interface tssetUser {
  user: string;
  phone: number | string;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: "username",
    phone: "13333333333",
    type: "",
    isLogin: false,
  } as tsUser,
  reducers: {
    setUser(state, action: PayloadAction<tssetUser>) {
      state.user = action.payload.user;
      state.phone = action.payload.phone;
    },
    setAdmin(state, action: PayloadAction<string>) {
      console.log(action);
      state.type = action.payload;
    },
    setLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
  },
});

export const { setUser, setAdmin } = userSlice.actions;
export const { reducer: userReducer } = userSlice;
