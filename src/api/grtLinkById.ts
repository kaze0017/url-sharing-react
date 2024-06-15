import axiosInstance from "./axios";
import { GET_LINK_BY_ID_URL } from "../constants";
import Body from "../components/table/Body";

interface GetLinkByIdInterface {
  token: string;
  id: string;
}

export async function getLinkById({ token, id }: GetLinkByIdInterface) {
  const formData = new URLSearchParams();
  formData.append("link_id", id);
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };

  try {
    const response = await axiosInstance.post(
      "https://api.url.faraertebat.com/link_management/filter_links_by_id/",

      formData.toString(),
      config
    );
    return response.data.result[0];
  } catch (error) {
    console.error(error);
    return [];
  }
}
