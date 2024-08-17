import React, { useState, useRef, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import { UserProfileContext } from "../../context/UserProfileProvider";
import { useNavigate } from "react-router-dom";
import FadeInOut from "./FadeInOut";
import SubmitBtn from "./SubmitBtn";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Backdrop,
  Button,
} from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import {
  setConfirmPassword,
  setPassword,
  setEmail,
  registerUser,
  setPending,
  initialRegisterSlice,
  setDisplayDialog,
} from "../../state/loginAndRegister/registerSlice";
import {
  PassConditionsType,
  PassConditionType,
} from "../../lib/interfaces/RegisterConditionsTypes";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SecurityCodeDialog from "./SecurityCodeDialog";

interface LoginFormProps {
  showRegister: boolean;
}
export function RegisterForm({ showRegister }: LoginFormProps) {
  const navigate = useNavigate();
  const { setAuth, setIsNewUser } = useContext(AuthContext);
  const { setUserProfile } = useContext(UserProfileContext);
  const [passFocused, setPassFocused] = useState(false);
  const [confirmPassFocused, setConfirmPassFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [showApiError, setShowApiError] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  function handleOpenBackdrop() {
    setOpenBackdrop(true);
    console.log("from handleOpenBackdrop");
  }
  function handleCloseBackdrop() {
    setOpenBackdrop(false);
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    apiError,
    passConditions,
    passConfirmConditions,
    emailConditions,
    formValid,
    isPending,
  } = useSelector((state: RootState) => state.register);
  const dispatch = useDispatch<AppDispatch>();
  dispatch(initialRegisterSlice());

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(setPending(true));

    const response: any = await dispatch(registerUser());
    console.log("from registerform ", response.payload);
    const status = response.payload.status;
    const data = response.payload.data;
    console.log("from registerform state ", status);
    if (status !== 200) {
      console.log(response);
      setShowApiError(true);
      setTimeout(() => {
        setShowApiError(false);
      }, 5000);
      return;
    }

    const tempUserProfile = {
      user_id: data.id,
      first_name: "",
      last_name: "",
      email: data.email,
      username: data.email,
    };

    // setAuth({
    //   userProfile: tempUserProfile,
    //   token: data.auth,
    // });

    // setUserProfile(tempUserProfile);
    // dispatch(initialRegisterSlice());
    // navigate("/initialProfile");

    dispatch(setDisplayDialog(true));
  }
  const errorClass = "text-red-500 text-sm";
  useEffect(() => {
    dispatch(initialRegisterSlice());
  }, [showRegister]);

  return (
    <FadeInOut show={showRegister} duration={500}>
      <SecurityCodeDialog />
      <form
        className="flex flex-col gap-2  max-w-md px-4 py-1 rounded-md"
        onSubmit={handleRegister}
      >
        <h1 className="text-xl font-semibold text-gray-500">Register</h1>

        {/* Email */}

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            type="email"
            label="Email"
            onChange={(e) => dispatch(setEmail(e.target.value))}
            onBlur={(e) => setEmailFocused(false)}
            onFocus={(e) => setEmailFocused(true)}
          />
        </FormControl>

        {/* Password */}

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={(e) => dispatch(setPassword(e.target.value))}
            onBlur={(e) => setPassFocused(false)}
            onFocus={(e) => setPassFocused(true)}
          />
        </FormControl>

        {/* Confirm Password */}

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
            onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
            onBlur={(e) => setConfirmPassFocused(false)}
            onFocus={(e) => setConfirmPassFocused(true)}
          />
        </FormControl>

        <SubmitBtn
          isDisabled={!formValid || isPending}
          isLoading={false}
          title="Create account"
        />
        {!formValid && !showApiError && (
          <Button
            onClick={handleOpenBackdrop}
            startIcon={<WarningAmberOutlinedIcon />}
            color={
              !formValid && (emailFocused || passFocused || confirmPassFocused)
                ? "warning"
                : formValid
                ? "success"
                : "primary"
            }
          >
            {confirmPassFocused
              ? passConfirmConditions.message
              : "Form Requirements"}
          </Button>
        )}

        {showApiError && <p className={errorClass}>{apiError}</p>}
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={handleCloseBackdrop}
      >
        <div className="flex flex-col gap-4">
          {/* Email Requirements */}

          <div className="flex flex-col gap-0 w-full">
            <h3 className="text-blue-100 text-sm w-full">Email requirements</h3>
            <p
              className={
                emailConditions.valid
                  ? "text-green-500  text-sm w-full capitalize"
                  : "text-white-500  text-sm w-full capitalize"
              }
            >
              Email must be valid
            </p>
            <p className="text-white-500  text-sm w-full capitalize">
              Example:{" "}
              <span className="text-white-500 lowercase">
                example@example.com
              </span>
            </p>
          </div>

          {/* Password Requirement */}
          <div className="flex flex-col gap-0 w-full">
            <h3 className="text-blue-100 text-sm w-full">
              Password requirements
            </h3>
            {Object.keys(passConditions as PassConditionsType).map((key) => {
              const condition = passConditions[
                key as keyof PassConditionsType
              ] as PassConditionType;
              return (
                <div key={key}>
                  <p
                    className={
                      condition.state
                        ? "text-green-500  text-sm w-full capitalize"
                        : "text-white-500  text-sm w-full capitalize"
                    }
                  >
                    {condition.message}
                  </p>
                </div>
              );
            })}
          </div>
          <Button
            onClick={handleCloseBackdrop}
            startIcon={<CloseOutlinedIcon />}
            color="error"
          >
            Close
          </Button>
        </div>
      </Backdrop>
    </FadeInOut>
  );
}
