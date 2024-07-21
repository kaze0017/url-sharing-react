import { SharedLinkType, UserProfileType } from "../interfaces";
export interface CategoryType {
  category_id: number;
  title: string;
  owner:  UserProfileType;
  sharedBy?: UserProfileType;
  suggestedBy?: UserProfileType;
  contentDescription?: string;
  thumbnail?: string;
  tags: string[];
  audience?: boolean;
  sharingAbility?: boolean;
  externalSharingAbility?: boolean;
  sharingDeptLevel?: string;
  type?: "article" | "video" | "podcast" | "image" | "other";
  publication_date: string;
  links: SharedLinkType[];
}
