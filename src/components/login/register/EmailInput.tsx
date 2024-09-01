import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../state/store";
import { setEmail } from "../../../state/loginAndRegister/registerSlice";

interface EmailInputProps {
  setEmailFocused: (value: boolean) => void;
}
export default function EmailInput({ setEmailFocused }: EmailInputProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { displayDialog } = useSelector((state: RootState) => state.register);
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
      <OutlinedInput
        id="outlined-adornment-email"
        type="email"
        label="Email"
        onChange={(e) => dispatch(setEmail(e.target.value))}
        onBlur={(e) => setEmailFocused(false)}
        onFocus={(e) => setEmailFocused(true)}
        disabled={displayDialog}
      />
    </FormControl>
  );
}
