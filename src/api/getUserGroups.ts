import axiosInstance from "./axios";
import { GET_USER_GROUPS_URL } from "../constants";

export async function getUserGroups(token: string) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };


  console.log("from getUserGroups, token: ", token);
  try {
    const response = await axiosInstance.get(
      GET_USER_GROUPS_URL,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          auth: token,
        },
      
      }
    );
    
    // config
    console.log("from getUserGroups, response: ", response);
    return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}
