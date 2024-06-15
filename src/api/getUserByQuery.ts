import axiosInstance from "./axios";
import { FIND_USER_BY_QUERY_URL } from "../constants";

export async function getUserByQuery(token: string, query: string) {
  const formData = new URLSearchParams();
  formData.append("query", query);
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };

  try {
    const response = await axiosInstance.post(
      FIND_USER_BY_QUERY_URL,
      formData.toString(),
      config
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}
