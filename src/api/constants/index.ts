export const USER_REGEX = /^[a-zA-Z0-9]{3,20}$/;

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const IP = "3.143.146.42";

// register a new user
export const REGISTER_URL = "https://api.url.faraertebat.com/auth/register/";

// login
export const LOGIN_URL = "https://api.url.faraertebat.com/auth/login/";

// create a new link
export const CREATE_URL =
  "https://api.url.faraertebat.com/link_management/create/";

// get links that are public (created by current user or others)
export const PUBLIC_URL =
  "https://api.url.faraertebat.com/link_management/public_links/";

// get links that are created by the user
export const USER_URL =
  "https://api.url.faraertebat.com/link_management/user_links/";

// get user profile info
export const USER_PROFILE_URL =
  "https://api.url.faraertebat.com/profile_user/user_profile_view/";

export const SHARE_LINKS_TO_USERs_URL =
  "https://api.url.faraertebat.com/link_management/share_links_to_users/";

// list of top 10 users with base info to share or …
export const TOP_USERs_URL =
  "https://api.url.faraertebat.com/member_management/top_users/";

// get popular links
export const POPULAR_URL =
  "https://api.url.faraertebat.com/link_management/populars_links/";

// update a link info
export const UPDATE_LINK_URL =
  "https://api.url.faraertebat.com/link_management/update_link_version/";

export const GET_LINK_BY_ID_URL =
  "https://api.url.faraertebat.com/link_management/filter_links_by_id/";

// search for users based on email
export const FIND_USER_BY_QUERY_URL =
  "https://api.url.faraertebat.com/member_management/find_user_view/";

// Notifications
export const NOTIFICATION_URL =
  "https://api.url.faraertebat.com/link_management/notifications/";

// get user profile info
export const USER_PROFILE_By_ID_URL =
  "https://api.url.faraertebat.com/member_management/get_specific_user_info/";

// Quick Access Links
export const QUICK_ACCESS_LINKS_URL =
  "https://api.url.faraertebat.com/link_management/quick_access_links/";

// Log Out
export const LOGOUT_URL = "https://api.url.faraertebat.com/logout/";

// Get User's Groups

export const GET_USER_GROUPS_URL =
  "https://api.url.faraertebat.com/member_management/private_people_group_manager/";

// Post User's Groups
export const POST_USER_GROUPS_URL =
  "https://api.url.faraertebat.com/member_management/private_people_group_manager/";

// Post Delete Link
export const DELETE_LINK_URL =
  "https://api.url.faraertebat.com/link_management/delete_link/";

// Post: Like Link
export const LIKE_LINK_URL =
  "https://api.url.faraertebat.com/link_management/like_link/";

// Post: Create Category
export const CREATE_CATEGORY_URL =
  "https://api.url.faraertebat.com/link_management/create_category_data/";

// Get: Get User's Categories
export const GET_USER_CATEGORIES_URL =
  "https://api.url.faraertebat.com/link_management/user_categories/";

// Post: Delete Category
export const DELETE_CATEGORY_URL =
  "https://api.url.faraertebat.com/link_management/remove_category/";

// Post: Add links to category
export const ADD_LINKS_TO_CATEGORY_URL =
  "https://api.url.faraertebat.com/link_management/links_to_category/";

// Get: User's Connections
export const GET_USER_CONNECTIONS_URL =
  "https://api.url.faraertebat.com/member_management/people_connection_list/";

// Post: Connect to person
export const CONNECT_TO_PERSON_URL =
  "https://api.url.faraertebat.com/member_management/people_connection/";
// Post Remove Connection
export const REMOVE_CONNECTION_URL =
  "https://api.url.faraertebat.com/member_management/people_connection_remove/";
