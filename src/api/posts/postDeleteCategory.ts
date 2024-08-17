import axiosInstance from "../axios";
import { DELETE_CATEGORY_URL } from "../constants";

export async function postDeleteCategory({
  token,
  id,
}: {
  id: number;
  token: string;
}) {
  console.log("API: DeleteCategories");


  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };
  const formData = new URLSearchParams();
  formData.append("category_id", id.toString());
  try {
    const response = await axiosInstance.post(
      DELETE_CATEGORY_URL,
      formData.toString(),
      config
    );
    console.log("API: postDeleteCategories", response.data);
    return response;
  } catch (error) {
    console.error("Error deleting links:", error);
    throw error;
  }
}
