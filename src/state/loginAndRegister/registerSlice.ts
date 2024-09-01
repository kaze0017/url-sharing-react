import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  PassConditionType,
  PassConditionsType,
  PassConfirmConditionsType,
  EmailConditionsType,
} from "../../lib/interfaces/RegisterConditionsTypes";
import { postRegisterUser } from "../../api/posts/postRegisterUser";

// Define the async thunk
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (_, { rejectWithValue, getState }) => {
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

    try {
      const apiResponse = await postRegisterUser(userData);
      console.log("from registerUser", apiResponse);
      return {
        data: apiResponse.data,
        status: apiResponse.status,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "Unknown error" }
      );
    }
  }
);

export interface RegisterState {
  email: string;
  password: string;
  confirmPassword: string;
  apiState: {
    message: string;
    status: number;
  };

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
  apiState: {
    message: "",
    status: 0,
  },
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
      Object.assign(state, initialState);
      console.log(
        "from initialRegisterSlice: display dialog",
        state.displayDialog
      );
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

      // Validate the password against the conditions
      const passValidation = validatePassword(
        action.payload,
        state.passConditions
      );
      state.passConditions.length.state = passValidation.length;
      state.passConditions.uppercase.state = passValidation.uppercase;
      state.passConditions.lowercase.state = passValidation.lowercase;
      state.passConditions.number.state = passValidation.number;
      state.passConditions.special.state = passValidation.special;

      // Recheck if passwords match
      state.passConfirmConditions.match =
        state.password === state.confirmPassword;

      // Recalculate form validity
      state.formValid = checkFormValidity(state);
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;

      // Recheck if passwords match
      state.passConfirmConditions.match =
        state.password === state.confirmPassword;

      // Recalculate form validity
      state.formValid = checkFormValidity(state);
    },
    setApiState: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      state.apiState = action.payload;
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
    builder
      .addCase(registerUser.pending, (state) => {
        state.isPending = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("from registerSlice", action.payload);
        state.apiState.message = action.payload.data.message;
        state.apiState.status = action.payload.status;

        switch (action.payload.status) {
          case 200:
          case 203:
          case 204:
          case 206:
          case 208:
            state.displayDialog = true;
            break;
          case 400:
            state.apiState.message =
              action.payload.data.message || "Error occurred";
            break;
          default:
            break;
        }

        state.isPending = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.apiState.message =  "Request failed";
        state.isPending = false;
      });
  },
});

export const {
  setEmail,
  setPassword,
  setConfirmPassword,
  setApiState,
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
