import Social from "./Social";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import LoginForm from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import {
  setLogin,
  setRegister,
} from "../../state/loginAndRegister/loginAndRegisterSlice";
import {
  initialRegisterSlice,
  setDisplayDialog,
} from "../../state/loginAndRegister/registerSlice";
import { initialLoginState } from "../../state/loginAndRegister/loginSlice";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

export default function LoginPanel() {
  const dispatch = useDispatch<AppDispatch>();
  const { LoginPageMode } = useSelector(
    (state: RootState) => state.loginAndRegister
  );
  const userRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  const mainWrapperClass = "h-900 uppercase  overflow-x-hidden login-container";
  const leftMenuClass = `flex flex-col h-full login-left p-4 gap-3 rounded-lg transition-transform duration-1000`;
  const formClass = `relative formClass flex flex-col h-full login-middle gradientBorder p-4 gap-3  transition-transform duration-1000`;
  const rightMenuClass = `flex flex-col h-full login-right p-4 gap-3 rounded-lg transition-transform duration-1000`;

  const leftMenuTransformClass = "";

  const rightMenuTransformClass = "";

  const childDivClass = "flex h-full  rounded-lg login-wrapper login-form";
  const childDivTransformClass =
    LoginPageMode === "register"
      ? "login-wrapper-translate transition-transform duration-1000"
      : "translate-x-0 transition-transform duration-1000 ";

  function handleShowRegister() {
    // dispatch(setDisplayDialog(false));
    dispatch(initialRegisterSlice());
    dispatch(setRegister());
  }
  function handleShowLogin() {
    dispatch(initialLoginState());
    dispatch(setLogin());
  }
  return (
    <div className={mainWrapperClass}>
      <div className={`${childDivClass} transform ${childDivTransformClass}`}>
        {/* left */}
        <div className={`${leftMenuClass} transform ${leftMenuTransformClass}`}>
          <div className="flex flex-col grow"></div>
          <div className="flex flex-col text-xs">
            <Typography variant="body1" color="primary">
              Don&apos;t have an account?
            </Typography>
            <Button onClick={handleShowRegister} color="primary">
              <Typography variant="h6" color="secondary">
                Sign Up
              </Typography>
            </Button>
          </div>
          <div className="flex flex-col grow"></div>
          <div className="flex justify-center">
            <img src="/logo/URLSHARE.png" className="w-[150px]" alt="" />
          </div>
        </div>
        {/* Form */}
        <div className={`${formClass}`}>
          {/* Login */}
          {LoginPageMode === "login" ? (
            <LoginForm showLogin={LoginPageMode === "login"} />
          ) : (
            <RegisterForm showRegister={LoginPageMode === "register"} />
          )}
          <Divider>Or</Divider>
          <Social />
        </div>
        {/* Right */}
        <div
          className={`${rightMenuClass} transform ${rightMenuTransformClass}`}
        >
          <div className="flex flex-col grow"></div>
          <div className="flex flex-col text-xs">
            <Typography variant="body1" color="primary">
              Already have an account?
            </Typography>
            <Button onClick={handleShowLogin} color="primary">
              <Typography variant="h6" color="secondary">
                Sign In
              </Typography>
            </Button>
          </div>
          <div className="flex flex-col grow"></div>
          <div className="flex justify-center">
            <img src="/logo/URLSHARE.png" className="w-[150px]" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
