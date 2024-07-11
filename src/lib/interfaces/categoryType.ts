export interface CategoryType {
  category_id: number;
  title: string;
  owner: "add"
  contentDescription?: string;
  thumbnail?: string;
  tags: string[];
  audience?: boolean;
  sharingAbility?: boolean;
  externalSharingAbility?: boolean;
  sharingDeptLevel?: string;
  type?: "article" | "video" | "podcast" | "image" | "other";
}
