import axiosInstance from "./axios";
import { POST_USER_GROUPS_URL } from "../constants";

interface PostUserGroupsInterface {
  token: string;
  user_ids: number[];
  description: string;
}

export async function postUserGroups({
  token,
  user_ids,
  description,
}: PostUserGroupsInterface) {
  const formData = new URLSearchParams();
  formData.append("user_ids", user_ids.join(","));
  formData.append("description", description);
console.log("postUserGroups -> formData", description)
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };

  try {
    const response = await axiosInstance.post(
      POST_USER_GROUPS_URL,
      formData.toString(),
      config
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
