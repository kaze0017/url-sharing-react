import React, { useContext } from "react";
import { SettingContext } from "../../../context/SettingsProvider";

import FAQsAbdUserguids from "./FAQsAbdUserguids";
import CustomerSupport from "./CustomerSupport";

export default function HelpAndSupport() {
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
            onClick={() => setSub("FAQs and User Guides")}
          >
            FAQs and User Guides
          </button>
          <button
            className={btnClass}
            onClick={() => setSub("Customer Support")}
          >
            Customer Support
          </button>
        </div>
      )}
      {sub === "FAQs and User Guides" && <FAQsAbdUserguids />}
      {sub === "Customer Support" && <CustomerSupport />}
    </div>
  );
}
