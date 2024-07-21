import { CategoryType } from "../interfaces/categoryType";
import { ContentType } from "../interfaces/contentType";
export default function mapCategoryToContent(category: CategoryType) {
  const content: ContentType = {
    id: category.category_id,
    contentClass: "category",
    thumbnail:
      category.thumbnail || "/images/defaults/generalDefaultThumbnail.jpg",
    title: category.title,
    description: category.contentDescription || "",
    owner: category.owner,
    suggestedBy: category.suggestedBy || category.owner,
    sharedBy: category.sharedBy || category.owner,
    status: true,
    audience: category.audience || false,
    type: "other",
    publicationDate: category.publication_date,
    expirationDate: "",
    likeCount: 0,
    sharedCount: 0,
    archivedCount: 0,
    qrCode: "",
    shortUrl: "",
  };
  return content;
}
