import Social from "./Social";
import FadeInOut from "./FadeInOut";

import { useEffect, useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";

import {
  REGISTER_URL,
  USER_REGEX,
  PASSWORD_REGEX,
  LOGIN_URL,
} from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";

import axiosInstance from "../../api/axios";

export default function LoginForm() {
  const { setAuth } = useAuth();

  //Register
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  // const [isPending, startTransition] = useTransition();

  // Login

  const loginUserRef = useRef<HTMLInputElement>(null);
  const loginPwdRef = useRef<HTMLInputElement>(null);

  const [loginUser, setLoginUser] = useState("");
  const [loginPwd, setLoginPwd] = useState("");
  const [loginErrorMsg, setLoginErrorMsg] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    setLoginErrorMsg("");
    setLoginSuccess("");
  }, [loginUser, loginPwd]);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(pwd);
    setValidMatch(result);

    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setError("");
  }, [user, email, pwd, matchPwd]);

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const [formType, setFormType] = useState<"login" | "register">("login");

  const mainWrapperClass = "h-900 uppercase  overflow-x-hidden login-container";
  const leftMenuClass = `flex flex-col h-full login-left p-4 gap-3 rounded-lg transition-transform duration-1000`;
  const formClass = `relative formClass flex flex-col h-full login-middle gradientBorder p-4 gap-3  transition-transform duration-1000`;
  const rightMenuClass = `flex flex-col h-full login-right p-4 gap-3 rounded-lg transition-transform duration-1000`;

  const leftMenuTransformClass = "";

  const rightMenuTransformClass = "";

  const childDivClass = "flex h-full  rounded-lg login-wrapper login-form";
  const childDivTransformClass =
    formType === "register"
      ? "login-wrapper-translate transition-transform duration-1000"
      : "translate-x-0 transition-transform duration-1000 ";

  const inputClass = `rounded-md border-gray-300 w-full`;

  function handleShowRegister() {
    setFormType("register");
    setShowLogin(false);
    setTimeout(() => {
      setShowRegister(true);
    }, 500);
  }
  function handleShowLogin() {
    setFormType("login");
    setShowRegister(false);
    setTimeout(() => {
      setShowLogin(true);
    }, 500);
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("username", userName);
      formData.append("password", password);

      const response = await axiosInstance.post(
        LOGIN_URL,
        formData.toString(),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );
      console.log(response);
      setAuth({ user: "mina", token: response.data.auth });
      navigate("/");

      // Assuming setUser is a function to set the logged-in user in your application state
      setUser(response.data.username);
      // Clear any input fields or states related to login
      setUserName("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("Registering...");

    try {
      const formData = new URLSearchParams();
      formData.append("username", user);
      formData.append("password", pwd);
      formData.append("email", email);

      const response = await axiosInstance.post(
        REGISTER_URL,
        formData.toString(),
        {}
      );
      console.log(response);

      setAuth({ user: user, token: response.data.auth });
      // navigate to  /
      navigate("/");

      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={mainWrapperClass}>
      <div className={`${childDivClass} transform ${childDivTransformClass}`}>
        {/* left */}
        <div className={`${leftMenuClass} transform ${leftMenuTransformClass}`}>
          <div className="flex flex-col grow"></div>
          <div className="flex flex-col text-xs">
            <p>Don&apos;t have an account?</p>
            <button onClick={handleShowRegister}>
              <h2 className="text-blue-950 text-bold text-2xl">Sign Up</h2>
            </button>
          </div>
          <div className="flex flex-col grow"></div>
          <div className="flex justify-center">
            <img src="/logo/URLSHARE.png" className="w-[150px]" alt="" />
          </div>
        </div>
        {/* Form */}
        <div className={`${formClass}`}>
          {/* Login */}
          <div className="flex flex-grow"></div>
          <FadeInOut show={showLogin} duration={500}>
            <form
              className="flex flex-col gap-2  max-w-md p-4 rounded-md"
              onSubmit={(e) => handleLogin(e)}
            >
              <h1 className="text-xl font-semibold text-gray-500">SIGN IN</h1>

              <input
                id="loginUser"
                className={`${inputClass}`}
                type="text"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={isPending}
              />
              <input
                className={`${inputClass}`}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
              />

              <div className="flex items-center gap-1 justify-between text-xs">
                <div className="flex items-center gap-1 text-xs">
                  <label htmlFor="remember" className="text-gray-800">
                    Remember me
                  </label>
                  <input
                    type="checkbox"
                    className="rounded-md border-gray-300"
                    id="remember"
                  />
                </div>
                <p className="text-blue-800 text-xs cursor-pointer ">
                  Forgot password?
                </p>
              </div>

              <button
                className="btn w-full bg-navy-800 text-white rounded-xl p-2 bg-blue-950"
                type="submit"
                disabled={isPending}
              >
                SIGN IN
              </button>
            </form>
          </FadeInOut>
          {/* Register */}
          <FadeInOut show={showRegister} duration={500}>
            <form
              className="flex flex-col gap-2  max-w-md p-4 rounded-md"
              onSubmit={handleRegister}
            >
              <p
                ref={errRef}
                aria-live="assertive"
                className="text-red-500"
              ></p>

              <h1 className="text-xl font-semibold text-gray-500">Register</h1>
              <input
                id="name"
                className="rounded-md border-gray-300"
                type="text"
                placeholder="Name"
                disabled={isPending}
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              {/* <p
                id="uidnote"
                className={
                  userFocus && user && !validName
                    ? "text-xs text-red-500"
                    : "text-xs text-gray-500"
                }
              >
                {userFocus && !validName ? "Invalid name" : ""}
              </p> */}
              <input
                className="rounded-md border-gray-300"
                type="email"
                placeholder="Email"
                disabled={isPending}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="rounded-md border-gray-300"
                type="password"
                placeholder="Password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />

              <input
                className="rounded-md border-gray-300"
                type="password"
                placeholder="Confirm password"
                id="confirmpassword"
                onChange={(e) => setMatchPwd(e.target.value)}
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="matchnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />

              <button
                // disabled={!(validName && validPwd && validMatch)}
                className="uppercase btn w-full bg-navy-800 text-white rounded-xl p-2 bg-blue-950"
                type="submit"
              >
                Create account
              </button>
            </form>
          </FadeInOut>
          {/* ----- OR ----- */}
          <div className="flex w-full items-center gap-2 text-gray-500 text-xs">
            <div className="grow h-0.5 bg-gray-500"></div>
            <p>OR</p>
            <div className="grow h-0.5 bg-gray-500"></div>
          </div>
          <Social />
          {/* <BackBtn
            message="Sign in with different ways"
            backToHref="/auth/register"
          /> */}
        </div>
        {/* Right */}
        <div
          className={`${rightMenuClass} transform ${rightMenuTransformClass}`}
        >
          <div className="flex flex-col grow"></div>
          <div className="flex flex-col text-xs">
            <p>Already have an account?</p>
            <button onClick={handleShowLogin}>
              <h2 className="text-blue-950 text-bold text-2xl">Sign In</h2>
            </button>
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
