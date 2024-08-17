import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  PassConditionType,
  PassConditionsType,
  PassConfirmConditionsType,
  EmailConditionsType,
} from "../../lib/interfaces/RegisterConditionsTypes";
import { postRegisterUser } from "../../api/posts/postRegisterUser";

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (_, { getState }) => {
    const regState = getState() as { register: RegisterState };
    let userData;
    if (regState.register.emailCode.length > 0) {
      userData = {
        username: regState.register.email,
        password: regState.register.password,
        email: regState.register.email,
        email_code: regState.register.emailCode,
      };
    } else {
      userData = {
        username: regState.register.email,
        password: regState.register.password,
        email: regState.register.email,
      };
    }

    const apiResponse = await postRegisterUser(userData);
    console.log("from registerUser thunk", apiResponse);

    let response;
    if (apiResponse.status >= 200 && apiResponse.status < 300) {
      response = {
        data: apiResponse.data,
        status: 200,
      };
    } else {
      response = {
        data: apiResponse.data,
        status: 400,
      };
    }
    return response;
    // }
    // response = {
    //   data: apiResponse.data,
    //   status: 200,
    // };
  }
);

export interface RegisterState {
  email: string;
  password: string;
  confirmPassword: string;
  apiError: string;
  passConditions: PassConditionsType;
  passConfirmConditions: PassConfirmConditionsType;
  emailConditions: EmailConditionsType;
  formValid: boolean;
  isPending: boolean;
  displayDialog: boolean;
  emailCode: string;
}

const initialState: RegisterState = {
  email: "",
  password: "",
  confirmPassword: "",
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
  passConfirmConditions: {
    match: false,
    message: "Passwords do not match",
  },
  emailConditions: {
    valid: false,
    message: "Email is not valid",
  },
  formValid: false,
  isPending: false,
  displayDialog: false,
  emailCode: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    initialRegisterSlice: (state) => {
      state = initialState;
    },

    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      const emailValidation = validateEmail(action.payload);
      state.emailConditions.valid = emailValidation;
      const formValidation = checkFormValidity(state);
      state.formValid = formValidation;
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
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
      if (state.password === action.payload) {
        state.passConfirmConditions.match = true;
      } else {
        state.passConfirmConditions.match = false;
      }
      const formValidation = checkFormValidity(state);
      console.log("formValidation", formValidation);
      state.formValid = formValidation;
    },
    setApiError: (state, action: PayloadAction<string>) => {
      state.apiError = action.payload;
    },
    setPending: (state, action: PayloadAction<boolean>) => {
      state.isPending = action.payload;
    },
    setDisplayDialog: (state, action: PayloadAction<boolean>) => {
      console.log("from setDisplayDialog", action.payload);
      state.displayDialog = action.payload;
    },
    setEmailCode: (state, action: PayloadAction<string>) => {
      state.emailCode = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log("from registerSlice", action.payload);
      if (action.payload.status === 200) {
        state.isPending = false;
      } else {
        state.isPending = false;
        state.apiError = action.payload.data.message;
        console.log("from registerSlice", action.payload.data.message);
      }
    });
  },
});

export const {
  setEmail,
  setPassword,
  setConfirmPassword,
  setApiError,
  setPending,
  initialRegisterSlice,
  setDisplayDialog,
  setEmailCode,
} = registerSlice.actions;
export default registerSlice.reducer;

function validatePassword(
  password: string,
  conditions: RegisterState["passConditions"]
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

function checkFormValidity(state: RegisterState) {
  return (
    state.passConditions.length.state &&
    state.passConditions.uppercase.state &&
    state.passConditions.lowercase.state &&
    state.passConditions.number.state &&
    state.passConditions.special.state &&
    state.passConfirmConditions.match &&
    state.emailConditions.valid
  );
}
