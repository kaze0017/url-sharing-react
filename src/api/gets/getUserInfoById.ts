import axiosInstance from "../axios";
import { USER_PROFILE_By_ID_URL } from "../constants";

interface functionInterface {
  token: string;
  userId: string;
}

export async function getUserInfoById({ token, userId }: functionInterface) {
  console.log("API: getUserInfoById");
  const formData = new URLSearchParams();
  formData.append("user_id", userId);
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };

  try {
    const response = await axiosInstance.post(
      USER_PROFILE_By_ID_URL,
      formData.toString(),
      config
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}
