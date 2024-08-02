import { ConnectionRequestType } from "./ConnectionRequestType";
import { SharedType } from "./SharedType";

export type NotificationType = {
  connection_request: ConnectionRequestType[];
  shared: SharedType[];
};

