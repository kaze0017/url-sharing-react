import React, { useState, useRef, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axiosInstance from "../../api/axios";
import { REGISTER_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import FadeInOut from "./FadeInOut";
import SubmitBtn from "./SubmitBtn";
import { set } from "react-hook-form";

interface LoginFormProps {
  showRegister: boolean;
}
export function RegisterForm({ showRegister }: LoginFormProps) {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string>("");

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    if (pwd !== matchPwd) {
      setError("Passwords do not match");
      setIsPending(false);
      return;
    }

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
      navigate("/initialProfile");

      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err: any) {
      setIsPending(false);

      setError(err.response.data.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }
  const errorClass = "text-red-500 text-sm";
  return (
    <FadeInOut show={showRegister} duration={500}>
      <form
        className="flex flex-col gap-2  max-w-md px-4 py-1 rounded-md"
        onSubmit={handleRegister}
      >
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
        />

        <input
          className="rounded-md border-gray-300"
          type="email"
          placeholder="Email"
          disabled={isPending}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="rounded-md border-gray-300"
          type="password"
          placeholder="Password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          aria-describedby="pwdnote"
          required
        />

        <input
          className="rounded-md border-gray-300"
          type="password"
          placeholder="Confirm password"
          id="confirmpassword"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
        />

        <SubmitBtn isDisabled={isPending} title="Create account" />
        <p className={errorClass}>{error}</p>
      </form>
    </FadeInOut>
  );
}
