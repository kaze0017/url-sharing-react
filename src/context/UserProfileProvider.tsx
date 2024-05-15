import React, {
  useState,
  createContext,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
  useContext,
} from "react";
import { getUserProfile } from "../api/axios";
import { UserProfileType } from "../lib/userProfileType";
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
  },
  setUserProfile: () => {},
});

interface UserProfileProviderProps {
  children: ReactNode;
}

export default  function UserProfileProvider({
  children,
}: UserProfileProviderProps) {
  const { auth } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState<UserProfileType>({
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
  });
  async function fetchUserProfile() {
    const response = await getUserProfile(auth?.token || "");
    setUserProfile(response);
  }
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export { UserProfileContext };
