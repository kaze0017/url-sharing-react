import PersonalInformation from "./PersonalInformation";
import OrganizationInformation from "./OrganizationInformation";
import PasswordAnsSecurity from "./PasswordAnsSecurity";
import ContactInformation from "./ContactInformation";

import React, { useContext } from "react";
import { SettingContext } from "../../../context/SettingsProvider";

export default function UserProfile() {
  const { sub, setSub } = useContext(SettingContext);
  const mainWrapperClass =
    "flex flex-col items-center justify-center w-full h-full uppercase text-2xl";
  const menuWrapperClass =
    "flex flex-col items-center justify-center w-full h-full gap-2 text-blue-950";
  const btnClass = "hover:bg-blue-950 hover:text-white p-2 w-1/2 text-center";
  return (
    <div className={mainWrapperClass}>
      {sub === "" && (
        <div className={menuWrapperClass}>
          <button
            className={btnClass}
            onClick={() => setSub("Personal Information")}
          >
            Personal Information
          </button>
          <button
            className={btnClass}
            onClick={() => setSub("Organization Information")}
          >
            Organization Information
          </button>
          <button
            className={btnClass}
            onClick={() => setSub("Password & Security")}
          >
            Password & Security
          </button>
          <button
            className={btnClass}
            onClick={() => setSub("Contact Information")}
          >
            Contact Information
          </button>
        </div>
      )}
      {sub === "Personal Information" && <PersonalInformation />}
      {sub === "Organization Information" && <OrganizationInformation />}
      {sub === "Password & Security" && <PasswordAnsSecurity />}
      {sub === "Contact Information" && <ContactInformation />}
    </div>
  );
}
