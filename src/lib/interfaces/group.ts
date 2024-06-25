import { UserProfileType } from "../interfaces";

export type GroupType = {
    group_id: number;
    name?: string;
    description: string;
    members: UserProfileType[];
    color?: string;
    tags?: string[];
};