import React from "react";
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
import { settingMap } from "../../lib/SettingMenus";


export default function MainPanel() {
  const { main, setMain, sub, setSub } = useContext(SettingContext);
  const { auth } = useContext(AuthContext);
  const mainWrapperClass = "flex flex-grow panel-light overflow-hidden";

  return (
    <div className={mainWrapperClass}>
      {main && sub === "" ? (
        React.createElement(settingMap[main])
      ) : sub ? (
        React.createElement(settingMap[sub])
      ) : (
        <h1>Not</h1>
      )}
    </div>
  );
}
