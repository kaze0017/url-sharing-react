// PasswordsInput.tsx

import React from "react";
import { useDispatch } from "react-redux";
import {
  setPassword,
  setConfirmPassword,
} from "../../../state/loginAndRegister/registerSlice";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface PasswordsInputProps {
  showPassword: boolean;
  handleClickShowPassword: () => void;
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setPassFocused: (value: boolean) => void;
  setConfirmPassFocused: (value: boolean) => void;
}

export default function PasswordsInput({
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  setPassFocused,
  setConfirmPassFocused,
}: PasswordsInputProps) {
  const dispatch = useDispatch();

  return (
    <>
      {/* Password */}
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
          onBlur={() => setPassFocused(false)}
          onFocus={() => setPassFocused(true)}
        />
      </FormControl>

      {/* Confirm Password */}
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-confirm-password">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-confirm-password"
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
          onBlur={() => setConfirmPassFocused(false)}
          onFocus={() => setConfirmPassFocused(true)}
        />
      </FormControl>
    </>
  );
}
