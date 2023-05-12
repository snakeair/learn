import { createSlice, PayloadAction } from "@reduxjs/toolkit";
/**
 * PayloadAction: action的ts声明
 *
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

/**
 *  // NOTE: reateSlice 创建reducer切片
 *  // NOTE: name 独立id，用于自动生成action中的type
 *  // NOTE: initialState初始state
 *  // NOTE: reducers state操作
 *  // INFO: initial: [ɪˈnɪʃ(ə)l]  初始值
 */

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

// NOTE : actions为自动从reducers中生成的，
export const { setUser, setAdmin } = userSlice.actions;
export const { reducer: userReducer } = userSlice;

// NOTE:  const userCtion = setUser({ user: "jack", phone: "110" }); console.log(userCtion);
// NOTE:  输出 {type: ${name/函数名}, payload:{...}  }
