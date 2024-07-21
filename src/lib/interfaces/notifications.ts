import { UserProfileType } from "../interfaces";
import { SharedLinkType } from "../interfaces";

export type NotificationType = {
  sender: UserProfileType;
  links: SharedLinkType[];
  description: string;
  publicationDate?: Date;
};
export type NotificationsType = Array<NotificationType>;



