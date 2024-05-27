import  {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface ProfilePictureProviderContextType {
  mode: "camera" | "upload" | "select";
  setMode: Dispatch<SetStateAction<"camera" | "upload" | "select">>;
}

const ProfilePictureContext = createContext<ProfilePictureProviderContextType>({
    mode: "select",
    setMode: () => {},
});

interface ProfilePictureProviderProps {
  children: ReactNode;
}

export default function ProfilePictureProvider({ children }: ProfilePictureProviderProps) {
  const [mode, setMode] = useState<"camera" | "upload" | "select">("select");
  return (
    <ProfilePictureContext.Provider value={{ mode, setMode }}>
      {children}
    </ProfilePictureContext.Provider>
  );
}

export { ProfilePictureContext };
