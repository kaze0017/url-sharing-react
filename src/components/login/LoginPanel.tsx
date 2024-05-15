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
import SubmitBtn from "./SubmitBtn";
import LoginForm from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export default function LoginPanel() {
  const { setAuth } = useAuth();

  //Register
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState("");

  const [pwd, setPwd] = useState("");

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [error, setError] = useState<string>("");
  // const [isPending, startTransition] = useTransition();

  // Login

  const loginUserRef = useRef<HTMLInputElement>(null);
  const loginPwdRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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
    setIsPending(true);
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
      setAuth({ user: "mina", token: response.data.auth });
      navigate("/");

      // Assuming setUser is a function to set the logged-in user in your application state
      setUser(response.data.username);
      // Clear any input fields or states related to login
      setUserName("");
      setPassword("");
    } catch (err: any) {
      setError(err.response.data.message);
      setTimeout(() => {
        setError("");
      }, 5000);
      setIsPending(false);
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

      setAuth({ user: user, token: response.data.auth });
      // navigate to  /
      navigate("/");

      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      console.log("err:", err);
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
          <LoginForm showLogin={showLogin} />
          <RegisterForm showRegister={showRegister} />
          {/* ----- OR ----- */}
          <div className="flex w-full items-center gap-2 text-gray-500 text-xs">
            <div className="grow h-0.5 bg-gray-500"></div>
            <p>OR</p>
            <div className="grow h-0.5 bg-gray-500"></div>
          </div>
          <Social />
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
