import { SharedLinkType } from "../interfaces";
import { ContentType } from "../interfaces/contentType";
export default function mapLinkToContent(link: SharedLinkType) {
  const content: ContentType = {
    id: link.id,
    contentClass: "link",
    thumbnail: link.thumbnail,
    title: link.title,
    description: link.contentDescription || "",
    owner: link.owner,
    suggestedBy: link.suggestedby || link.owner,
    sharedBy: link.sharedby || link.owner,
    status: true,
    audience: link.audience || false,
    type: link.url_type,
    publicationDate: link.publicationDate || "",
    expirationDate: link.expirationDate || "",
    likeCount: link.likeCount || 0,
    sharedCount: link.sharedCount,
    archivedCount: 0,
    qrCode: link.qr_code || "",
    shortUrl: link.short_url || "",
  };
  return content;
}
