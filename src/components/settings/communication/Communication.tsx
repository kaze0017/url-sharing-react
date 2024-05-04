import React, { useContext } from "react";
import { SettingContext } from "../../../context/SettingsProvider";

import ChatSettings from "./ChatSettings";
import EmailPreference from "./EmailPreference";

export default function Communication() {
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
          <button className={btnClass} onClick={() => setSub("Chat Settings")}>
            Chat Settings
          </button>
          <button
            className={btnClass}
            onClick={() => setSub("Email Preferences")}
          >
            Email Preferences
          </button>
        </div>
      )}
      {sub === "Chat Settings" && <ChatSettings />}
      {sub === "Email Preferences" && <EmailPreference />}
    </div>
  );
}
