import axiosInstance from "./axios";
import { TOP_USERs_URL } from "../constants";

export async function getTopUsers(token: string) {
  try {
    const response = await axiosInstance.get(TOP_USERs_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: token,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}
