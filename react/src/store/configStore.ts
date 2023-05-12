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
