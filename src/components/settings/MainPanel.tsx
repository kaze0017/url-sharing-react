import { useContext } from "react";
import { SettingContext } from "../../context/SettingsProvider";
import AuthContext from "../../context/AuthProvider";
import UserProfile from "./userProfile/UserProfile";
import AccountManagement from "./accountManagement/AccountManagement";
import Notification from "./notification/Notification";
import PrivacyAndSecurity from "./privacyAndSecurity/PrivacyAndSecurity";
import DisplayAndInterface from "./displayAndInterface/DisplayAndInterface";
export default function MainPanel() {
  const { main, setMain, sub, setSub } = useContext(SettingContext);
  const { auth } = useContext(AuthContext);

  const mainWrapperClass = "flex flex-grow panel-light overflow-hidden";
  return (
    <div className={mainWrapperClass}>
      {main.toLocaleLowerCase() === "user profile" && <UserProfile />}
      {main.toLocaleLowerCase() === "account management" && (
        <AccountManagement />
      )}
      {main.toLocaleLowerCase() === "notification" && <Notification />}
      {main.toLocaleLowerCase() === "privacy and security" && (
        <PrivacyAndSecurity />
      )}
      {main.toLocaleLowerCase() === "display and interface" && (
        <DisplayAndInterface />
      )}
    </div>
  );
}
