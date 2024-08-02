import axiosInstance from "../axios";
import { GET_USER_CONNECTIONS_URL } from "../constants";


export async function getUserConnections(token: string) {
  console.log("API: getUserConnections");
  try {
    const response = await axiosInstance.get(GET_USER_CONNECTIONS_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: token,
      },
    });
    console.log("getUserConnections", response);
    return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}