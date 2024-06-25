import { QUICK_ACCESS_LINKS_URL } from "../constants";
import axiosInstance from "./axios";

interface postQuickAccessLinksInterface {
  token: string;
  links_add?: number;
  links_remove?: number;
}

export async function postQuickAccessLinks({
  token,
  links_add,
  links_remove,
}: postQuickAccessLinksInterface) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };
  const body = {
    links_add: links_add,
    links_remove: links_remove,
  };

  try {
    const response = await axiosInstance.post(
      QUICK_ACCESS_LINKS_URL,
      body,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
