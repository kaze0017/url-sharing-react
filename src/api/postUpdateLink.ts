import axiosInstance from "./axios";
import { UPDATE_LINK_URL } from "../constants";

interface UpdateLinkInterface {
  id: number;
  token: string;
  formData: URLSearchParams;
}

export async function updateLink({ id, token, formData }: UpdateLinkInterface) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };
  const url = UPDATE_LINK_URL + id + "/";

  try {
    const response = await axiosInstance.post(url, formData.toString(), config);
    return response;
  } catch (error) {
    console.error(error);
  }
}
