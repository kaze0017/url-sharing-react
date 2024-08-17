import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { UserProfileContext } from "../../context/UserProfileProvider";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import {
  initialRegisterSlice,
  registerUser,
  setDisplayDialog,
  setEmailCode,
} from "../../state/loginAndRegister/registerSlice";

export default function SecurityCodeDialog() {
  const navigate = useNavigate();
  const { setAuth, setIsNewUser } = useContext(AuthContext);
  const { setUserProfile } = useContext(UserProfileContext);
  const dispatch = useDispatch<AppDispatch>();
  const { displayDialog, apiError, emailCode } = useSelector(
    (state: RootState) => state.register
  );
  const [showApiError, setShowApiError] = useState(false);

  const handleClose = () => {
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

  return (
    <Dialog open={displayDialog}>
      <DialogTitle>Please Verify Your Email</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the security code sent to your email address.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="securityCode"
          name="securityCode"
          label="Security Code"
          type="text"
          fullWidth
          variant="standard"
          value={emailCode}
          onChange={(e) => dispatch(setEmailCode(e.target.value))}
        />
        {showApiError && (
          <DialogContentText color="error">{apiError}</DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
