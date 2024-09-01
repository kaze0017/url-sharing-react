import { REGISTER_URL } from "../../api/constants";
import axiosInstance from "../../api/axios";

interface RegisterUser {
  username: string;
  password: string;
  email: string;
  email_code?: string;
}

export async function postRegisterUser({
  username,
  password,
  email,
  email_code,
}: RegisterUser) {
  try {
    const formData = new URLSearchParams();
    formData.append("password", password);
    formData.append("email", email);
    formData.append("username", username);
    if (email_code) {
      formData.append("email_code", email_code);
    }
    console.log("from postRegisterUser - Formdata", formData.toString());
    const response = await axiosInstance.post(
      REGISTER_URL,
      formData.toString(),
      {}
    );
    console.log(" from API - response",response);
    return response;
  } catch (err: any) {
    console.log(err.response);
    return err.response;
  }
}
