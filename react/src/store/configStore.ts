import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface configTs {
  error: string;
}

const configStore = createSlice({
  name: "config",
  initialState: {
    error: "",
  } as configTs,
  reducers: {
    setError(state, action: PayloadAction<configTs>) {
      state.error = action.payload.error;
    },
  },
});

export const { setError } = configStore.actions;
export const { reducer: configReducer } = configStore;
// NOTE: 导出configStore的reducer并给他赋一个别名configReducer
// console.log(configStore);
