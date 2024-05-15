import {
  useState,
  createContext,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
  useContext,
} from "react";
import { getUserProfile } from "../api/axios";
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
      profile_picture: "",
      last_name: "",
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
    }
  );

  // async function fetchUserProfile() {
  //   const response = await getUserProfile(auth?.token || "");
  //   setUserProfile(response);
  // }
  // useEffect(() => {
  //   fetchUserProfile();
  // }, []);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export { UserProfileContext };
