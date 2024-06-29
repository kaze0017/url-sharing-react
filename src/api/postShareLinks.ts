import axiosInstance from "./axios";
import { SHARE_LINKS_TO_USERs_URL } from "../constants";

interface ShareLinkToUsersInterface {
  token: string;
  data: {
    message: string;
    description: string;
    link_ids: number[];
    user_ids?: number[];
    group_ids?: number[];
    expirationDate?: string;
    publicationDate?: string;
  };
}

export async function postShareLinks({
  token,
  data,
}: ShareLinkToUsersInterface) {
  console.log("API: shareLinks");
  const formData = new URLSearchParams();

  formData.append("message", data.message);
  formData.append("description", data.description);
  formData.append("links", data.link_ids.toString());

  if (data.user_ids) {
    formData.append("people", data.user_ids?.toString());
  }
  if (data.group_ids) {
    formData.append("groups", data.group_ids.toString());
  }
  if (data.expirationDate) {
    formData.append("expirationDate", data.expirationDate);
  }
  if (data.publicationDate) {
    formData.append("publicationDate", data.publicationDate);
  }
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };

  try {
    const response = await axiosInstance.post(
      SHARE_LINKS_TO_USERs_URL,
      formData.toString(),
      config
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
