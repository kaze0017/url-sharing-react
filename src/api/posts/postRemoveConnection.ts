import { REMOVE_CONNECTION_URL } from "../constants";
import axiosInstance from "../axios";

export const postRemoveConnection = async (
  token: string,
  people_id: number
) => {
  console.log("API: postRemoveConnection");
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };
  const formData = new URLSearchParams();
  formData.append("people_id", people_id.toString());

  try {
    const response = await axiosInstance.post(
      REMOVE_CONNECTION_URL,
      formData.toString(),
      config
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
