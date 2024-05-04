import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { mainListType } from "../lib/SettingMenus";
import { subListType } from "../lib/SettingMenus";

interface SettingsContextType {
  main: mainListType;
  sub: subListType | "";
  setMain: Dispatch<SetStateAction<mainListType>>;
  setSub: Dispatch<SetStateAction<subListType | "">>;
}

const SettingContext = createContext<SettingsContextType>({
  main: "User Profile",
  setMain: () => {},
  sub: "",
  setSub: () => {},
});

interface ModeProviderProps {
  children: ReactNode;
}

export default function SettingProvider({ children }: ModeProviderProps) {
  const [main, setMain] = useState<mainListType>("User Profile");
  const [sub, setSub] = useState<subListType | "">("Personal Information");
  return (
    <SettingContext.Provider value={{ main, setMain, sub, setSub }}>
      {children}
    </SettingContext.Provider>
  );
}

export { SettingContext };
