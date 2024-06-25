import { LOGIN_URL } from "../constants";
import axiosInstance from "./axios";

interface postLoginInterface {
  username: string;
  password: string;
}

export async function postLogin({ username, password }: postLoginInterface) {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  try {
    const response = await axiosInstance.post(LOGIN_URL, formData.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      withCredentials: true,
    });
    console.log("login response", response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
