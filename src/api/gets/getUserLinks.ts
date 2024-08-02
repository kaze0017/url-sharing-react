import axiosInstance from "../axios";
import { USER_URL } from "../constants";
export async function getUserLinks(token: string) {
  console.log("API: getUserLinks");
  try {
    const response = await axiosInstance.get(
      "https://api.url.faraertebat.com/link_management/user_links/",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          auth: token,
        },
      }
    );
    console.log("getUserLinks", response);
    return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}
