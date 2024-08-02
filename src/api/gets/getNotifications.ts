import axiosInstance from "../axios";
import { NOTIFICATION_URL } from "../constants";

export async function getNotifications(token: string) {
  console.log("API: getNotifications");
  console.log("API: getNotifications token", token);

  try {
    const response = await axiosInstance.get(NOTIFICATION_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: token,
      },
    });
    console.log("getNotifications in API *********", response.data.result); 
    if (typeof response.data.result.shared === "string") {
      return [response.data.result.shared];
    } else if (Array.isArray(response.data.result.shared)) {
      return response.data.result;
    } else {
      return [];
    }
  } catch (error) {
    console.error( "Error in getNotifications in API *********", error);
    return [];
  }
}
