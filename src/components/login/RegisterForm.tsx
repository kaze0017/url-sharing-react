import React, { useState, useEffect } from "react";
import FadeInOut from "./FadeInOut";
import SubmitBtn from "./register/SubmitBtn";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import {
  registerUser,
  setPending,
  setDisplayDialog,
} from "../../state/loginAndRegister/registerSlice";

import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import SecurityCodeDialog from "./register/SecurityCodeDialog";
import RegisterFormConditions from "./register/RegisterFormConditions";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import EmailInput from "./register/EmailInput";
import PasswordsInput from "./register/PasswordsInput";

interface LoginFormProps {
  showRegister: boolean;
}
export function RegisterForm({ showRegister }: LoginFormProps) {
  const [passFocused, setPassFocused] = useState(false);
  const [confirmPassFocused, setConfirmPassFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [showApiError, setShowApiError] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handlePassFocused(value: boolean) {
    setPassFocused(value);
  }
  function handleConfirmPassFocused() {
    setConfirmPassFocused(true);
  }

  function handleOpenBackdrop() {
    setOpenBackdrop(true);
    console.log("from handleOpenBackdrop");
  }
  function handleCloseBackdrop() {
    setOpenBackdrop(false);
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { passConfirmConditions, formValid, isPending, displayDialog } =
    useSelector((state: RootState) => state.register);
  const dispatch = useDispatch<AppDispatch>();

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setPending(true));
    const response: any = await dispatch(registerUser());
    const status = response.status;
    if (status !== 200) {
      console.log(response);
      setShowApiError(true);
      setTimeout(() => {
        setShowApiError(false);
      }, 5000);
      return;
    }
    dispatch(setDisplayDialog(true));
  }

useEffect(() => {
  if (!displayDialog) {
    console.log(
      "Dialog should not be displayed, as displayDialog is:",
      displayDialog
    );
  }
}, [displayDialog]);


  return (
    <FadeInOut show={showRegister} duration={500}>
      <form
        className="flex flex-col gap-2  max-w-md px-4 py-1 rounded-md"
        onSubmit={handleRegister}
      >
        <Typography variant="h5" component="h1">
          Register
        </Typography>

        {/* Email */}
        <EmailInput setEmailFocused={setEmailFocused} />

        {displayDialog ? (
          <SecurityCodeDialog />
        ) : (
          <>
            {/* Password */}
            <PasswordsInput
              setPassFocused={handlePassFocused}
              setConfirmPassFocused={handleConfirmPassFocused}
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
            />

            <SubmitBtn
              isDisabled={!formValid || isPending}
              isLoading={isPending}
              title="Create account"
            />
            {!formValid && !showApiError && (
              <Button
                onClick={handleOpenBackdrop}
                startIcon={<WarningAmberOutlinedIcon />}
                color={
                  !formValid &&
                  (emailFocused || passFocused || confirmPassFocused)
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

            <Dialog
              sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={openBackdrop}
              onClick={handleCloseBackdrop}
              PaperComponent={Paper}
            >
              <RegisterFormConditions
                handleCloseBackdrop={handleCloseBackdrop}
              />
            </Dialog>
          </>
        )}
      </form>
    </FadeInOut>
  );
}
