import axiosInstance from "../axios";
import { USER_URL } from "../constants";
import { PUBLIC_URL } from "../constants";
export async function getUserLinks(token: string) {
  console.log("API: getUserLinks");
  console.log("token", token);
  console.log("USER_URL", USER_URL);
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
    console.log("response", response);
    return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}
