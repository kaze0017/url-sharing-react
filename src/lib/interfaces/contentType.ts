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

export interface ContentType {
  id: number;
  contentClass: "link" | "category";
  thumbnail: string;
  title: string;
  description: string;
  owner: UserProfileType;
  suggestedBy: UserProfileType;
  sharedBy: UserProfileType;
  status: boolean;
  audience: boolean;
  type: "article" | "video" | "podcast" | "image" | "other";
  publicationDate: string;
  expirationDate: string;
  likeCount: number;
  sharedCount: number;
  archivedCount: number;
  qrCode: string;
  shortUrl: string;
  rankCount?: number;
  savedCount?: number;
  qr_code?: string;
  short_url?: string;
}
