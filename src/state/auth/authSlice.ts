import { createSlice } from "@reduxjs/toolkit";
import { UserProfileType } from "../../lib/interfaces";

interface AuthState {
  user: UserProfileType;
  token: string;
}

const initialState: AuthState = {
  user: {
    user_id:0,
    email: "",
    first_name: "",
    last_name: "",
    tags: [],
    categories: [],
  },
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
