import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface SettingsContextType {
  main:
    | "User Profile"
    | "Notification"
    | "Notification"
    | "Privacy & Security"
    | "Display & interface"
    | "Account Management";
  setMain: Dispatch<
    SetStateAction<
      | "User Profile"
      | "Notification"
      | "Privacy & Security"
      | "Display & interface"
      | "Account Management"
    >
  >;
  sub:
    | "Personal Information"
    | "Organization Information"
    | "Password & Security"
    | "contact Information"
    | "Email Notification"
    | "Push Notification"
    | "Sound Notification"
    | "Privacy settings"
    | "Data Management"
    | "Theme & Appearance"
    | "Language"
    | "Accessibility"
    | "Subscription Details"
    | "Connected Accounts";

  setSub: Dispatch<
    SetStateAction<
      | "Personal Information"
      | "Organization Information"
      | "Password & Security"
      | "contact Information"
      | "Email Notification"
      | "Push Notification"
      | "Sound Notification"
      | "Privacy settings"
      | "Data Management"
      | "Theme & Appearance"
      | "Language"
      | "Accessibility"
      | "Subscription Details"
      | "Connected Accounts"
    >
  >;
}

const SettingContext = createContext<SettingsContextType>({
  main: "User Profile",
  setMain: () => {},
  sub: "Personal Information",
  setSub: () => {},
});

interface ModeProviderProps {
  children: ReactNode;
}

export default function SettingProvider({ children }: ModeProviderProps) {
  const [main, setMain] = useState< "User Profile"  | "Notification" | "Privacy & Security" | "Display & interface" | "Account Management" >("User Profile");
    const [sub, setSub] = useState< "Personal Information" | "Organization Information" | "Password & Security" | "contact Information" | "Email Notification" | "Push Notification" | "Sound Notification" | "Privacy settings" | "Data Management" | "Theme & Appearance" | "Language" | "Accessibility" | "Subscription Details" | "Connected Accounts" >("Personal Information");
  return (
    <SettingContext.Provider value={{ main, setMain, sub, setSub }}>
      {children}
    </SettingContext.Provider>
  );
}

export { SettingContext };
