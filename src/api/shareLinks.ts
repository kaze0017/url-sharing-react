import axiosInstance from "./axios";
import { SHARE_LINKS_TO_USERs_URL } from "../constants";
import { SharedLinkType } from "../lib/interfaces";
import { json } from "d3";

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

  formData.append("message", "message test");
  formData.append("description", "description test");
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

  try {
    // const response = await axiosInstance.post(
    //   SHARE_LINKS_TO_USERs_URL,
    //   formData,
    //   config
    // );
    console.log("Token", token);
    const response = await axiosInstance.post(
      SHARE_LINKS_TO_USERs_URL,
      {
        message: "share link 100 to Asghar with id 31",
        description: "share link 100 to Asghar with id 31",
        links: "100",
        people: "31",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          auth: token,
        },
      }
    );
    // formData.toString(), config;
    console.log("share links response", response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
