import { UserProfileType } from "../interfaces";
import { SharedLinkType } from "../interfaces";
import { CategoryType } from "./categoryType";
// export interface ContentType {
//   id: number;
//   title: string;
//   owner: UserProfileType;
//   sharedBy: UserProfileType;
//   suggestedBy: UserProfileType;
//   description: string;
//   thumbnail: string;
//   audience: boolean;
//   tags: string[];
//   class: "link" | "category";
//   type: "article" | "video" | "podcast" | "image" | "other";
//   url: string;
//   sharingAbility?: boolean;
//   externalSharingAbility?: boolean;
//   sharingDeptLevel?: string;
//   publicationDate?: string;
//   expirationDate?: string;
//   likeCount?: number;
//   rankCount: number;
//   savedCount: number;
//   seenCount: number;
//   sharedCount: number;
//   qr_code?: string;
//   short_url?: string;
// }

export interface ContentType{
  id: number,
  link: SharedLinkType,
  category: CategoryType,
  contentClass: "link" | "category",
}
