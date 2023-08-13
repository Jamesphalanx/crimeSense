import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface authState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
}
const initialState: authState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

//State slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreToken: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.userToken = action.payload;
    },
    signIn: (state, action: PayloadAction<string>) => {
      state.isSignout = false;
      state.userToken = action.payload;
    },
    signOff: (state) => {
      state.isSignout = true;
      state.userToken = null;
    },
  },
});

// Action creators are automatically generated for each case reducer function
export const { restoreToken, signIn, signOff } = authSlice.actions;

export default authSlice.reducer;
