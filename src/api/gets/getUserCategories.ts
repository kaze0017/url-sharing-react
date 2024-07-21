import axiosInstance from "../axios";
import { GET_USER_CATEGORIES_URL } from "../constants";
export async function getUserCategories(token: string) {
  console.log("API: getUserCategories");
  try {
    const response = await axiosInstance.get(GET_USER_CATEGORIES_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: token,
      },
    });
    return response.data.categories;
  } catch (error) {
    console.error(error);
    return [];
  }
}
