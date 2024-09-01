import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  PassConditionType,
  PassConditionsType,
  PassConfirmConditionsType,
  EmailConditionsType,
} from "../../lib/interfaces/RegisterConditionsTypes";
import { postLogin } from "../../api/posts/postLogin";
import { setUser } from "../auth/authSlice";

export const loginFunction = createAsyncThunk(
  "login/loginUser",
  async (_, { getState , dispatch}) => {
    const loginState = getState() as { login: LoginState };
    const userData = {
      username: loginState.login.email,
      password: loginState.login.password,
    };
    const apiResponse: any = await postLogin(userData);
    console.log("from login thunk", apiResponse);

    let response;
    if (apiResponse.status >= 200 && apiResponse.status < 300) {
      response = {
        data: apiResponse.data,
        status: 200,
      };
      dispatch(setUser(apiResponse.profile));
    } else {
        console.log("apiResponse in login slice", apiResponse);
      response = {
        data: apiResponse.data,
        status: 400,
      };
      loginState.login.apiError = apiResponse.data.message;
    }
    return response;
  }
);

export interface LoginState {
  email: string;
  password: string;
  apiError: string;
  passConditions: PassConditionsType;
  emailConditions: EmailConditionsType;
  formValid: boolean;
  isPending: boolean;
}

const initialState: LoginState = {
  email: "",
  password: "",
  apiError: "",
  passConditions: {
    length: {
      value: 8,
      message: "Password must be at least 8 characters",
      state: false,
    },
    uppercase: {
      value: 1,
      message: "Password must contain at least 1 uppercase letter",
      state: false,
    },
    lowercase: {
      value: 1,
      message: "Password must contain at least 1 lowercase letter",
      state: false,
    },
    special: {
      value: 1,
      message: "Password must contain at least 1 special character",
      state: false,
    },
    number: {
      value: 1,
      message: "Password must contain at least 1 number",
      state: false,
    },
  },
  emailConditions: {
    valid: false,
    message: "Email is not valid",
  },
  formValid: false,
  isPending: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    initialLoginState(state) {
      state = initialState;
    },

    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
      state.emailConditions.valid = validateEmail(action.payload);
      state.formValid = checkFormValidity(state);
    },

    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
      const passValidation = validatePassword(
        action.payload,
        state.passConditions
      );
      state.passConditions.length.state = passValidation.length;
      state.passConditions.uppercase.state = passValidation.uppercase;
      state.passConditions.lowercase.state = passValidation.lowercase;
      state.passConditions.number.state = passValidation.number;
      state.passConditions.special.state = passValidation.special;

      const formValidation = checkFormValidity(state);
      console.log("formValidation", formValidation);
      state.formValid = formValidation;
    },

    setApiError(state, action: PayloadAction<string>) {
      state.apiError = action.payload;
    },
    setIsPending(state, action: PayloadAction<boolean>) {
      state.isPending = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginFunction.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(loginFunction.fulfilled, (state, action) => {
      state.isPending = false;
      if (action.payload.status !== 200) {
        state.apiError = action.payload.data;
      }
    });
  },
});

export const { setEmail, setPassword, setApiError, setIsPending, initialLoginState } =
  loginSlice.actions;
export default loginSlice.reducer;

function validatePassword(
  password: string,
  conditions: LoginState["passConditions"]
) {
  return {
    length: password.length >= conditions.length.value,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function checkFormValidity(state: LoginState) {
  return (
    state.passConditions.length.state &&
    state.passConditions.uppercase.state &&
    state.passConditions.lowercase.state &&
    state.passConditions.number.state &&
    state.passConditions.special.state &&
    state.emailConditions.valid
  );
}
