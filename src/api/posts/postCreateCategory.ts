import { CREATE_CATEGORY_URL } from "../constants";
import axiosInstance from "../axios";
import { CategoryType } from "../../lib/interfaces/categoryType";

interface postCreateCategoryInterface {
  token: string;
  data: CategoryType;
}

export async function postCreateCategory({
  token,
  data,
}: postCreateCategoryInterface) {
  const formData = new URLSearchParams();
  formData.append("title", data.title);
  formData.append("contentDescription", data.contentDescription || "");
  formData.append("thumbnail", data.thumbnail || "");
  formData.append("tags", data.tags?.join(",") || "");
  formData.append("audience", data.audience ? "True" : "False");
  formData.append("sharingAbility", data.sharingAbility ? "True" : "False");
  formData.append(
    "externalSharingAbility",
    data.externalSharingAbility ? "True" : "False"
  );
  formData.append("sharingDeptLevel", data.sharingDeptLevel || "");
  console.log("API: postCreateCategory");
  try {
    const response = await axiosInstance.post(
      CREATE_CATEGORY_URL,
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          auth: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
