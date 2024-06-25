import { LOGOUT_URL } from "../constants";
import axiosInstance from "./axios";

interface postLogOutInterface {
  token: string;
}

export async function postLogOut({
  token,
}: postLogOutInterface) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };

  try {
    const response = await axiosInstance.post(LOGOUT_URL, config);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
