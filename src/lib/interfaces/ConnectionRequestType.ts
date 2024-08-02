import { SharedLinkType } from "../interfaces";
import { UserProfileType } from "../interfaces";
export type ConnectionRequestType = {
  event_id: number;
  public_links: SharedLinkType[];
  user_info: UserProfileType;
}

