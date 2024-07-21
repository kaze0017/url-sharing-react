import axiosInstance from "../axios";
import { ADD_LINKS_TO_CATEGORY_URL } from "../constants";

export async function postAddLinksToCategory({
  token,
  category_id,
  link_ids,
}: {
  category_id: number;
  link_ids: number[];
  token: string;
}) {
  console.log("API: AddLinksToCategory");
  console.log("category_id", category_id);
  console.log("link_ids", link_ids);

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };

  const formData = new URLSearchParams();
  formData.append("category_id", category_id.toString());
  formData.append("link_ids", link_ids.join(","));
  try {
    const response = await axiosInstance.post(
      ADD_LINKS_TO_CATEGORY_URL,
      formData.toString(),
      config
    );
    console.log("Response from api add", response);
    return response;
  } catch (error) {
    console.error("Error adding links to category:", error);
    throw error;
  }
}
