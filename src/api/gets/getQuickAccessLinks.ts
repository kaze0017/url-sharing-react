import { QUICK_ACCESS_LINKS_URL } from "../constants";
import axiosInstance from "../axios";


export async function getQuickAccessLinks(token: string) {
  console.log("API: getQuickAccessLinks");
  try {
    const response = await axiosInstance.get(QUICK_ACCESS_LINKS_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: token,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
