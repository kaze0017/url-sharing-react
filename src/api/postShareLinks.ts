import axiosInstance from "./axios";
import { SHARE_LINKS_TO_USERs_URL } from "../constants";

interface ShareLinkToUsersInterface {
  token: string;
  message: string;
  description: string;
  link_ids: number[];
  user_ids?: number[];
  group_ids?: number[];
  expirationDate?: string;
  publicationDate?: string;
}

export async function shareLinks({
  token,
  message,
  description,
  link_ids,
  user_ids,
  group_ids,
  expirationDate,
  publicationDate,
}: ShareLinkToUsersInterface) {
  const formData = new URLSearchParams();

  formData.append("message", message);
  formData.append("description", description);
  formData.append("links", link_ids.toString());

  if (user_ids) {
    formData.append("people", user_ids?.toString());
  }
  if (group_ids) {
    formData.append("groups", group_ids.toString());
  }
  if (expirationDate) {
    formData.append("expirationDate", expirationDate);
  }
  if (publicationDate) {
    formData.append("publicationDate", publicationDate);
  }
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };


  console.log("share links api", " token", token);
  try {
    const response = await axiosInstance.post(
      SHARE_LINKS_TO_USERs_URL,
      formData.toString(),
      config
    );
    console.log("share links response", response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
