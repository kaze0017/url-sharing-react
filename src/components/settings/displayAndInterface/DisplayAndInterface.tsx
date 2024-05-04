import React, { useContext } from "react";
import { SettingContext } from "../../../context/SettingsProvider";
import Accessibility from "./Accessibility";
import Language from "./Language";
import ThemAndAppearance from "./ThemAndAppearance";

export default function DisplayAndInterface() {
  const { sub, setSub } = useContext(SettingContext);
  const mainWrapperClass =
    "flex flex-col items-center justify-center w-full h-full uppercase text-2xl";
  const menuWrapperClass =
    "flex flex-col items-center justify-center w-full h-full gap-2 text-blue-950";
  const btnClass = "hover:bg-blue-950 hover:text-white p-2 w-1/2 text-center uppercase";
  return (
    <div className={mainWrapperClass}>
      {sub === "" && (
        <div className={menuWrapperClass}>
          <button className={btnClass} onClick={() => setSub("Accessibility")}>
            Accessibility
          </button>
          <button className={btnClass} onClick={() => setSub("Language")}>
            Language
          </button>

          <button
            className={btnClass}
            onClick={() => setSub("Theme & Appearance")}
          >
            Theme and Appearance
          </button>
        </div>
      )}
      {sub === "Accessibility" && <Accessibility />}
      {sub === "Language" && <Language />}
      {sub === "Theme & Appearance" && <ThemAndAppearance />}
    </div>
  );
}
