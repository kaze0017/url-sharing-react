import FadeInOut from "./FadeInOut";
import SubmitBtn from "./SubmitBtn";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { UserProfileContext } from "../../context/UserProfileProvider";
import axiosInstance from "../../api/axios";
import { LOGIN_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  showLogin: boolean;
}
export default function LoginForm({ showLogin }: LoginFormProps) {
  const navigate = useNavigate();

  const { setAuth, auth } = useContext(AuthContext);
  const { setUserProfile } = useContext(UserProfileContext);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const inputClass = `rounded-md border-gray-300 w-full`;

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

      setAuth({
        userProfile: response.data.profile,
        token: response.data.auth,
      });

      setUserProfile(response.data.profile);

      navigate("/");

      setUserName(response.data.username);
      // Clear any input fields or states related to login
      setUserName("");
      setPassword("");
    } catch (err: any) {
      console.log(err.response);
      setError(err.response.data.message);
      setTimeout(() => {
        setError("");
      }, 5000);
      setIsPending(false);
    }
  }

  const errorClass = "text-red-500 text-sm";

  return (
    <FadeInOut show={showLogin} duration={500}>
      <form
        className="flex flex-col gap-2  max-w-md px-4 py-1 rounded-md"
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
          id="loginPassword"
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
              id="remember"
              type="checkbox"
              className="rounded-md border-gray-300"
            />
          </div>
          <p className="text-blue-800 text-xs cursor-pointer ">
            Forgot password?
          </p>
        </div>

        <SubmitBtn isDisabled={isPending} title="Sign In" />
        <p className={errorClass}>{error}</p>
      </form>
    </FadeInOut>
  );
}
