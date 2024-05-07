import React, { useContext } from "react";
import { SettingContext } from "../../../context/SettingsProvider";

import ChatSettings from "./ChatSettings";
import EmailPreference from "./EmailPreference";
import PanelMenu from "../PanelMenu";
import { settingsMenuLinks } from "../../../lib/SettingMenus";

export default function Communication() {
  const { sub, setSub } = useContext(SettingContext);
  const mainWrapperClass =
    "flex flex-col items-center justify-center w-full h-full uppercase text-2xl";
  const menuWrapperClass =
    "flex flex-col items-center justify-center w-full h-full gap-2 text-blue-950";
  const btnClass = "hover:bg-blue-950 hover:text-white p-2 w-1/2 text-center";
  return <PanelMenu menu={settingsMenuLinks[5]} />;
}
