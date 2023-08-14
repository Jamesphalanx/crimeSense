import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  uid: string | null;
  name?: string | null;
  email?: string | null;

  username?: string | null;
}
const initialState: UserState = {
  uid: null,
};

//State slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
  },
});

// Action creators are automatically generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
