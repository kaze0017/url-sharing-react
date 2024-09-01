import FadeInOut from "./FadeInOut";
import SubmitBtn from "./register/SubmitBtn";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { UserProfileContext } from "../../context/UserProfileProvider";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import {
  initialLoginState,
  loginFunction,
  setEmail,
  setIsPending,
  setPassword,
} from "../../state/loginAndRegister/loginSlice";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Backdrop,
  Button,
  Typography,
} from "@mui/material";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  PassConditionType,
  PassConditionsType,
} from "../../lib/interfaces/RegisterConditionsTypes";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

interface LoginFormProps {
  showLogin: boolean;
}
export default function LoginForm({ showLogin }: LoginFormProps) {
  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);
  const { setUserProfile } = useContext(UserProfileContext);
  const dispatch = useDispatch<AppDispatch>();

  const [showApiError, setShowApiError] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setIsPending(true));
    const response: any = await dispatch(loginFunction());
    const status = response.payload.status;
    const data = response.payload.data;

    if (status === 200) {
      console.log("from login form", data);
      setAuth({
        userProfile: data.profile,
        token: data.auth,
      });
      localStorage.setItem("url_sharing_token", data.auth);

      setUserProfile(data.profile);
      dispatch(initialLoginState());

      navigate("/");
    } else {
      setShowApiError(true);
      setTimeout(() => {
        setShowApiError(false);
      }, 5000);

      setIsPending(false);
    }
  }

  const { formValid, emailConditions, passConditions, isPending } = useSelector(
    (state: RootState) => state.login
  );

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  function handleOpenBackdrop() {
    setOpenBackdrop(true);
  }
  function handleCloseBackdrop() {
    setOpenBackdrop(false);
  }

  return (
    <FadeInOut show={showLogin} duration={500}>
      <form
        className="flex flex-col gap-2  max-w-md px-4 py-1 rounded-md"
        onSubmit={(e) => handleLogin(e)}
      >
        <Typography variant="h5" component="h1">
          SIGN IN
        </Typography>
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
        <div className="flex items-center gap-1 justify-between text-xs">
          <div className="flex items-center gap-1 text-xs">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked size="small" />}
                label={
                  <Typography variant="caption" color="textSecondary">
                    Remember me
                  </Typography>
                }
              />
            </FormGroup>
          </div>
          <Button color="primary" variant="text">
            <Typography variant="caption" color="primary">
              Forgot password?
            </Typography>
          </Button>
        </div>
        <SubmitBtn
          isDisabled={!formValid || isPending}
          isLoading={false}
          title="Login"
        />
        {!formValid && !showApiError && (
          <Button
            onClick={handleOpenBackdrop}
            startIcon={<WarningAmberOutlinedIcon />}
            color={
              !formValid && (emailFocused || passFocused)
                ? "warning"
                : formValid
                ? "success"
                : "primary"
            }
          >
            Form Requirements
          </Button>
        )}

        {/* <p className={errorClass}>{error}</p> */}
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
