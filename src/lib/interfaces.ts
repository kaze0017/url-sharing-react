// export type PersonType = {
//   id: number;
//   first_name: string;
//   last_name: string;
//   title: string;
//   profile_picture: string;
//   followers?: number;
//   publications: {
//     links?: Array<{ title: string; url: string }> | null;
//     categories?: string | string[] | null;
//   };
//   rankCount?: number;
//   sharesCount?: number;
//   subscribersCount?: number;
//   org_name?: string;
//   org_picture?: string;
//   connections?: PersonType[];
// };

export type UserProfileType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture?: string;
  title?: string;
  user_name?: string;
  org_email?: string;
  org_foa?: string;
  org_name?: string;
  org_picture?: string;
  payment_info?: string;
  payment_method?: string;
  sub_name?: string;
  sub_remaining_days?: number;
  user_id?: number;
  publications?: {
    links: { title: string; url: string }[];
    categories: string | string[];
  };
  sharesCount?: number;
  rankCount?: number;
  suggestionsCount?: number; //new
  linkApproval?: {
    approved?: SharedLinkType[];
    pending?: SharedLinkType[];
    rejected?: SharedLinkType[];
  }; //new
  connection_date?: string; //new
  connections?: UserProfileType[]; //new
  subscribers?: UserProfileType[]; //new
  subscribed?: UserProfileType[]; //new
  relationStatus?: string; //new
  pendingConnections?: UserProfileType[]; //new
  groups?: groupType[];
  phone?: string; //new
  address?: {
    country?: string;
    city?: string;
    state?: string;
    street?: string;
    postcode?: string;
  }; //new
  tags?: string[]; //new
  categories?: CategoryType[]; //new
};

export type SharedLinkType = {
  id: number;
  title: string;
  owner: UserProfileType;
  sharedby: UserProfileType | null;
  suggestedby: UserProfileType | null;
  audience: true | false | null;
  url: string;
  back_up_link_1st: string | null;
  back_up_link_2nd: string | null;
  back_up_link_3rd: string | null;
  category: string | null;
  class_type: "link" | "category";
  description: string | null;
  expirationDate: string | null;
  health_backup_1st: true | false | null;
  health_backup_2nd: true | false | null;
  health_backup_3rd: true | false | null;
  health_main_url: true | false | null;
  icon_id: string | null;
  likeCount: number;
  publicationDate: string;
  rankCount: number;
  savedCount: number;
  seenCount: number;
  sharedCount: number;
  tags: Array<string> | string | null;
  thumbnail: string | "";
  url_pass: string | null;
  url_type: "article" | "video" | "podcast" | "image" | "other";
  url_username: string | null;
  qr_code: string | null;
  short_url: string | null;
};

export interface CategoryType {
  id?: number;
  title: string;
  owner: UserProfileType;
}

export interface groupType {
  id: number;
  name: string;
  members: UserProfileType[];
  description: string;
  color: string;
  tags: string[];
}
