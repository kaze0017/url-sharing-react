import axiosInstance from "./axios";
import { NOTIFICATION_URL } from "../constants";

export async function getNotifications(token: string) {
  console.log("getNotifications token", token);
  try {
    const response = await axiosInstance.get(NOTIFICATION_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: "14ab6943-464c-47ab-b220-c711fb2e4aee",
      },
    });
    // auth: token,
    console.log("notification response", response);
    console.log("notification links", response.data.result.shared);
    if (typeof response.data.result.shared === "string") {
      return [response.data.result.shared];
    } else if (Array.isArray(response.data.result.shared)) {
      return response.data.result.shared;
    } else {
      console.log("notification response is not as expected", response);
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
