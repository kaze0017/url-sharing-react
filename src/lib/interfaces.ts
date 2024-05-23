export type PersonType = {
  id: number;
  first_name: string;
  last_name: string;
  title: string;
  profile_picture: string;
  followers?: number;
  publications: {
    links?: Array<{ title: string; url: string }> | null;
    categories?: string | string[] | null;
  };
  rankCount?: number;
  sharesCount?: number;
  subscribersCount?: number;
  org_name?: string;
  org_picture?: string;
  connections?: PersonType[];
};

export type UserProfileType = {
  id: number;
  first_name: string;
  profile_picture: string;
  last_name: string;
  title: string;
  email: string;
  user_name: string;
  org_email: string;
  org_foa: string;
  org_name: string;
  org_picture: string;
  payment_info: string;
  payment_method: string;
  sub_name: string;
  sub_remaining_days: number;
  user_id: number;
  publications?: {
    links: { title: string; url: string }[];
    categories: string | string[];
  };
  sharesCount?: number;
  rankCount?: number;
  subscribersCount?: number;
  connections?: PersonType[];
  pendingConnections?: PersonType[];
  groups?: groupType[];
};

export type SharedLinkType = {
  id: number;
  title: string;

  owner: PersonType;
  sharedby: PersonType | null;
  suggestedby: PersonType | null;

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
  thumbnail: string | null;
  url_pass: string | null;
  url_type: "article" | "video" | "podcast" | "image" | "other";
  url_username: string | null;

  // id: number;
  // title: string;
  // class?: "category" | "link"; //links for now
  // type: "article" | "video" | "podcast" | "image" | "other"; //Other for now
  // linkUrls: {
  //   primary: {
  //     url: string;
  //     health?: "healthy" | "unhealthy" | "unknown"; //true/false/null for now  health - > sanity
  //   };
  //   secondary?: {
  //     url: string;
  //     health?: "healthy" | "unhealthy" | "unknown";
  //   };
  //   tertiary?: {
  //     url: string;
  //     health?: "healthy" | "unhealthy" | "unknown";
  //   };
  // };

  // popularity: number | 0; //Drop this
  // views: number | 0; //Drop this
  // sharedCount: number | 0;

  // seen?: boolean | false; //Add this
  // saved: boolean | false;

  // seenCount?: number | 0;
  // savedCount: number | 0;
  // rankCount: number | 0;

  // thumbnail?: string | "default";
  // description?: string;

  // owner: Person; //limited fields not the person object

  // publicationDate?: string;
  // expirationDate?: string;

  // sharedLinks?: SharedLinkType[]; //Drop this

  // tags?: string[] | ["tag1", "tag2", "tag3"];
  // categories?: string | "category1";

  // rank?: number; //Drop this

  // sharedBy?: "user" | "other" | "unknown"; //Comparison with owner -> Limited Person object
  // suggestedBy?: Person; //limited fields not the person object
  // audience?: "public" | "private" | "protected";

  // QRCode?: string; //Separate API for this
  // ShortURL?: string; //Separate API for this
};

export interface CategoryType {
  id?: number;
  title: string;
  owner: PersonType;
}

export interface groupType {
  id: number;
  name: string;
  members: PersonType[];
  description: string;
  color: string;
  tags: string[];
}
