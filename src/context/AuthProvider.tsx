import React, { createContext, useState } from "react";
import { UserProfileType } from "../lib/interfaces";

interface AuthContextType {
  auth: { userProfile: UserProfileType | null; token: string | null } | null;
  setAuth: React.Dispatch<
    React.SetStateAction<{
      userProfile: UserProfileType | null;
      token: string | null;
    } | null>
  >;
}

const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<{
    userProfile: UserProfileType | null;
    token: string | null;
  } | null>({
    userProfile: null,
    token: null,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
