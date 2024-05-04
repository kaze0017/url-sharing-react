import React, { useContext } from "react";
import { SettingContext } from "../../../context/SettingsProvider";

import MyCredit from "./MyCredit";
import MyPromotions from "./MyPromotions";

export default function InAppPurchase() {
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
          <button className={btnClass} onClick={() => setSub("My Credit")}>
            My Credit
          </button>
          <button className={btnClass} onClick={() => setSub("My Promotions")}>
            My Promotions
          </button>
        </div>
      )}
      {sub === "My Credit" && <MyCredit />}
      {sub === "My Promotions" && <MyPromotions />}
    </div>
  );
}