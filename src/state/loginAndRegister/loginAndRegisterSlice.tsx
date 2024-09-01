import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface loginAndRegisterState {
  LoginPageMode: "login" | "register";
}

const initialState: loginAndRegisterState = {
  LoginPageMode: "login",
};

const loginAndRegisterSlice = createSlice({
  name: "loginAndRegister",
  initialState,
  reducers: {
    setLogin: (state) => {
      state.LoginPageMode = "login";
    },
    setRegister: (state) => {
      state.LoginPageMode = "register";
    },
  },
});


export const { setLogin, setRegister } = loginAndRegisterSlice.actions;

export default loginAndRegisterSlice.reducer;
