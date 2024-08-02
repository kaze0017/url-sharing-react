import { UserProfileType } from "../interfaces";
import { SharedLinkType } from "../interfaces";

type linkType = SharedLinkType & { event_id: number };

export type SharedType = {
  sender: UserProfileType;
  links: linkType[];
  description: string;
  publicationDate?: Date;
};

