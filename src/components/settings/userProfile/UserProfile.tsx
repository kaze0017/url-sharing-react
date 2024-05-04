import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import PersonalInformation from "./PersonalInformation";
import OrganizationInformation from "./OrganizationInformation";
import PasswordAnsSecurity from "./PasswordAnsSecurity";
import ContactInformation from "./ContactInformation";
import { useContext } from "react";
import { SettingContext } from "../../../context/SettingsProvider";
import AuthContext from "../../../context/AuthProvider";

export default function UserProfile() {
  const mainWrapperClass =
    "relative h-full w-full p-2 flex flex-col gap-2 overflow-x-scroll overflow-y-scroll scrollbar-hide";

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  return (
    <div className={mainWrapperClass} {...events} ref={ref}>
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
