import React, { useContext } from "react";
import PersonalInformation from "./PersonalInformation";
import OrganizationInformation from "./OrganizationInformation";
import PasswordAnsSecurity from "./PasswordAnsSecurity";
import ContactInformation from "./ContactInformation";
import PanelMenu from "../PanelMenu";
import { settingsMenuLinks } from "../../../lib/SettingMenus";
import { SettingContext } from "../../../context/SettingsProvider";

export default function UserProfile() {
  return <PanelMenu menu={settingsMenuLinks[0]} />;
}
