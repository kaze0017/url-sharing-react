import axiosInstance from "../axios";
import { PUBLIC_URL } from "../constants";

export async function getTopSharedCategories(token: string) {
  console.log("API: getTopSharedCategories");
  try {
    const response = await axiosInstance.get(PUBLIC_URL, {
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
