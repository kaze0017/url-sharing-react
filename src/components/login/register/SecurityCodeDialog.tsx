import React, { useState, useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import { UserProfileContext } from "../../../context/UserProfileProvider";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../state/store";
import {
  initialRegisterSlice,
  registerUser,
  setDisplayDialog,
  setEmailCode,
} from "../../../state/loginAndRegister/registerSlice";
import { Box, Grid, Paper, Typography } from "@mui/material";
import SecurityCodeInput from "./SecurityCodeInput";
import ButtonGroup from "@mui/material/ButtonGroup";
import { setLogin } from "../../../state/loginAndRegister/loginAndRegisterSlice";
import {
  setEmail,
  setPassword,
} from "../../../state/loginAndRegister/loginSlice";

export default function SecurityCodeDialog() {
  const navigate = useNavigate();
  const { setAuth, setIsNewUser } = useContext(AuthContext);
  const { setUserProfile } = useContext(UserProfileContext);
  const dispatch = useDispatch<AppDispatch>();
  const { displayDialog, emailCode, apiState, email, password , isPending} = useSelector(
    (state: RootState) => state.register
  );
  const [showApiError, setShowApiError] = useState(false);

  const handleClose = () => {
    dispatch(setEmailCode(""));
    dispatch(setDisplayDialog(false));
  };

  const handleSubmit = async () => {
    console.log("from registerformSecurity ");
    const response: any = await dispatch(registerUser());

    const status = response.payload.status;
    if (status !== 200) {
      console.log(response);
      setShowApiError(true);
      setTimeout(() => {
        setShowApiError(false);
      }, 5000);
      return;
    }

    const data = response.payload.data;
    const tempUserProfile = {
      user_id: data.id,
      first_name: "",
      last_name: "",
      email: data.email,
      username: data.email,
    };

    setAuth({
      userProfile: tempUserProfile,
      token: data.auth,
    });

    setUserProfile(tempUserProfile);
    dispatch(initialRegisterSlice());
    navigate("/initialProfile");
  };

  function handleCancel() {
    dispatch(setDisplayDialog(false));
  }

  function handleGoToLogin() {
    dispatch(setEmail(email));
    dispatch(setPassword(password));
    dispatch(setLogin());
  }

  return (
    <Paper>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        rowGap={2}
        padding={0.5}
      >
        {apiState.status !== 204 && (
          <>
            <Typography variant="body1" color="primary">
              {apiState.message}
            </Typography>
            <SecurityCodeInput />
            <ButtonGroup variant="contained">
              <Button
                onClick={handleClose}
                color="secondary"
                variant="contained"
              >
                Cancel
              </Button>
              <LoadingButton
                color="primary"
                onClick={handleSubmit}
                variant="contained"
                loading={isPending}
              >
                Submit / Resend
              </LoadingButton>
              {/* <Button color="warning" onClick={handleSubmit} variant="contained">
            Resend
          </Button> */}
            </ButtonGroup>
          </>
        )}
        {apiState.status === 204 && (
          <>
            <Typography variant="body1" color="primary">
              {apiState.message}
            </Typography>
            <Button
              onClick={handleGoToLogin}
              color="secondary"
              variant="contained"
            >
              Go To Sign In
            </Button>
          </>
        )}
      </Box>
    </Paper>
    // <Dialog open={displayDialog}>
    //   <DialogTitle>Please Verify Your Email</DialogTitle>
    //   <DialogContent>
    //     <DialogContentText>
    //       Please enter the security code sent to your email address.
    //     </DialogContentText>
    //     <TextField
    //       autoFocus
    //       required
    //       margin="dense"
    //       id="securityCode"
    //       name="securityCode"
    //       label="Security Code"
    //       type="text"
    //       fullWidth
    //       variant="standard"
    //       value={emailCode}
    //       onChange={(e) => dispatch(setEmailCode(e.target.value))}
    //     />
    //     {/* {showApiError && ( */}
    //       {/* // <DialogContentText color="error">{apiError.message}</DialogContentText> */}
    //     {/* // )} */}
    //   </DialogContent>
    //   <DialogActions>
    //     <Button onClick={handleClose} color="primary">
    //       Cancel
    //     </Button>
    //     <Button color="primary" onClick={handleSubmit}>
    //       Submit
    //     </Button>
    //   </DialogActions>
    // </Dialog>
  );
}
