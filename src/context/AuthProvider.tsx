import React, { createContext, useState } from "react";

interface AuthContextType {
  auth: { user: string; token: string } | null;
  setAuth: React.Dispatch<
    React.SetStateAction<{ user: string; token: string } | null>
  >;
}

const AuthContext = createContext<AuthContextType>({
  auth: { user: "", token: "" },
  setAuth: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<{ user: string; token: string } | null>({
    user: "",
    token: "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
