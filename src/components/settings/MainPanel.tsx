import { useContext } from "react";
import { SettingContext } from "../../context/SettingsProvider";
import AuthContext from "../../context/AuthProvider";
import UserProfile from "./userProfile/UserProfile";
import AccountManagement from "./accountManagement/AccountManagement";
import Notification from "./notification/Notification";
import PrivacyAndSecurity from "./privacyAndSecurity/PrivacyAndSecurity";
import DisplayAndInterface from "./displayAndInterface/DisplayAndInterface";
import CommunicationComponent from "./communication/Communication";
import AdvancedSettings from "./advancedSettings/AdvancedSettings";
import HelpAndSupport from "./helpAndSupport/HelpAndSupport";
import MyInterests from "./myInterests/MyInterests";
import IdentityAndVerification from "./identityAndVerification/IdentityAndVerification";
import InAppPurchase from "./inAppPurchase/InAppPurchase";
import { mainListType } from "../../lib/SettingMenus";

const componentsMap: { [key in mainListType]: React.ComponentType<any> } = {
  "User Profile": UserProfile,
  "Notification": Notification,
  "Privacy & Security": PrivacyAndSecurity,
  "Display & interface": DisplayAndInterface,
  "Account Management": AccountManagement,
  "Communication": CommunicationComponent,
  "Advanced Settings": AdvancedSettings,
  "Help & Support": HelpAndSupport,
  "My Interests": MyInterests,
  "Identity & Verification": IdentityAndVerification,
  "In-App Purchase": InAppPurchase,
};


export default function MainPanel() {
  const { main, setMain, sub, setSub } = useContext(SettingContext);
  const { auth } = useContext(AuthContext);
  const Component = componentsMap[main];
  const mainWrapperClass = "flex flex-grow panel-light overflow-hidden";

  return <div className={mainWrapperClass}>{Component && <Component />}</div>;
}
