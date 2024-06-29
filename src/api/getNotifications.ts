import axiosInstance from "./axios";
import { NOTIFICATION_URL } from "../constants";

export async function getNotifications(token: string) {
  console.log("API: getNotifications");
  try {
    const response = await axiosInstance.get(NOTIFICATION_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: token,
      },
    });
    console.log(response);
    if (typeof response.data.result.shared === "string") {
      return [response.data.result.shared];
    } else if (Array.isArray(response.data.result.shared)) {
      return response.data.result.shared;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
