import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useContext,
} from "react";
import { UserProfileType } from "../lib/interfaces";
import AuthContext from "./AuthProvider";

interface UserProfileContextType {
  userProfile: UserProfileType;
  setUserProfile: Dispatch<SetStateAction<UserProfileType>>;
}

const UserProfileContext = createContext<UserProfileContextType>({
  userProfile: {
    email: "",
    first_name: "",
    id: 0,
    last_name: "",
    org_email: "",
    org_foa: "",
    org_name: "",
    org_picture: "",
    payment_info: "",
    payment_method: "",
    profile_picture: "",
    sub_name: "",
    sub_remaining_days: 0,
    user_id: 0,
    user_name: "",
    title: "",
    publications: {
      links: [],
      categories: "",
    },
    sharesCount: 0,
    subscribersCount: 0,
    connections: [],
    pendingConnections: [],
  },
  setUserProfile: () => {},
});

interface UserProfileProviderProps {
  children: ReactNode;
}

export default function UserProfileProvider({
  children,
}: UserProfileProviderProps) {
  const { auth } = useContext(AuthContext);

  const [userProfile, setUserProfile] = useState<UserProfileType>(
    auth?.userProfile || {
      id: 0,
      first_name: "",
      last_name: "",
      profile_picture: "",
      title: "",
      email: "",
      user_name: "",
      org_email: "",
      org_foa: "",
      org_name: "",
      org_picture: "",
      payment_info: "",
      payment_method: "",
      sub_name: "",
      sub_remaining_days: 0,
      user_id: 0,
      publications: {
        links: [],
        categories: "",
      },
      connections: [],
      pendingConnections: [],
    }
  );

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

function initializeUserProfile() {
  const userProfile = {
    id: 4,
    first_name: "...",
    last_name: "...",
    profile_picture: "",
    title: "",
    email: "",
    user_name: "",
    org_email: "",
    org_foa: "",
    org_name: "",
    org_picture: "",
    payment_info: "",
    payment_method: "",
    sub_name: "basic",
    sub_remaining_days: 0,
    user_id: 40,
    publications: { links: [], categories: "" },
    sharesCount: 0,
    subscribersCount: 0,
    connections: [],
    pendingConnections: [],
  };

  return userProfile;
}

export { UserProfileContext, initializeUserProfile };
