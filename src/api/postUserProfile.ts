import axiosInstance from "./axios";
import { USER_PROFILE_URL } from "../constants";
import { UserProfileType } from "../lib/interfaces";

interface UserProfileInterface {
  token: string;
  userProfile: UserProfileType;
}

export async function postUserProfile({
  token,
  userProfile,
}: UserProfileInterface) {
  const formData = new URLSearchParams();
  for (const [key, value] of Object.entries(userProfile)) {
    formData.append(key, String(value));
  }

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };

  try {
    const response = await axiosInstance.post(
      USER_PROFILE_URL,
      formData.toString(),
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
