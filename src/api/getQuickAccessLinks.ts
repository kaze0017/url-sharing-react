import { QUICK_ACCESS_LINKS_URL } from "../constants";
import axiosInstance from "./axios";

interface GetQuickAccessLinksParams {
  token: string;
}

export async function getQuickAccessLinks({
  token,
}: GetQuickAccessLinksParams) {

  try {
    const response = await axiosInstance.get(QUICK_ACCESS_LINKS_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: token,
      },
    });
    console.log("get", response);
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
