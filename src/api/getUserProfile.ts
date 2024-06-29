import axiosInstance from "./axios";
import { USER_PROFILE_URL } from "../constants";

export async function getUserProfile(token: string) {
  console.log("API: getUserProfile");
  try {
    const response = await axiosInstance.get(USER_PROFILE_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: token,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
}
