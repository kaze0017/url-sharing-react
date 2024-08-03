import { REGISTER_URL } from "../../api/constants";
import axiosInstance from "../../api/axios";

export async function postRegisterUser({
  username,
  password,
  email,
}: {
  username: string;
  password: string;
  email: string;
}) {
  try {
    const formData = new URLSearchParams();
    formData.append("password", password);
    formData.append("email", email);
    formData.append("username", username);

    const response = await axiosInstance.post(
      REGISTER_URL,
      formData.toString(),
      {}
    );
    return response;
  } catch (err: any) {
    console.log(err.response);
    return err.response;
  }
}
