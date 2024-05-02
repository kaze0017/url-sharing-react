import { useContext } from "react";
import { SettingContext } from "../../context/SettingsProvider";
import AuthContext from "../../context/AuthProvider";
import PersonalInformation from "./userProfile/PersonalInformation";
import OrganizationInformation from "./userProfile/OrganizationInformation";
import PasswordAnsSecurity from "./userProfile/PasswordAnsSecurity";
import ContactInformation from "./userProfile/ContactInformation";

export default function MainPanel() {
  const { main, setMain, sub, setSub } = useContext(SettingContext);
  const { auth } = useContext(AuthContext);
  return (
    <div className="panel-light flex-grow p-1">
      {/* Personal Information */}
      <PersonalInformation />
      {/* Organization Information */}
      <OrganizationInformation />
      {/* Password & Security */}
      <PasswordAnsSecurity />
      {/* Contact Information */}
      <ContactInformation />
    </div>
  );
}
