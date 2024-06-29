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
  // id: number;
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
  user_id: number;
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
  sharedby?: UserProfileType;
  suggestedby?: UserProfileType;
  audience?: true | false;
  event_id?: number;
  url: string;
  back_up_link_1st?: string;
  back_up_link_2nd?: string;
  back_up_link_3rd?: string;
  category: string | null;
  class_type: "link" | "category";
  contentDescription: string | null;
  health_backup_1st?: true | false;
  health_backup_2nd?: true | false;
  health_backup_3rd?: true | false;
  health_main_url?: true | false;
  icon_id: string | null;
  likeCount: number;
  publicationDate?: string;
  expirationDate?: string;
  rankCount: number;
  savedCount: number;
  seenCount: number;
  sharedCount: number;
  tags?: Array<string>;
  thumbnail: string | "";
  url_pass?: string;
  url_type: "article" | "video" | "podcast" | "image" | "other";
  url_username?: string;
  qr_code?: string;
  short_url?: string;
};

export interface CategoryType {
  id?: number;
  title: string;
  owner: UserProfileType;
}

export interface groupType {
  id: number;
  description: string;
  members: UserProfileType[];
  name: string;
  color: string;
  tags: string[];
}
