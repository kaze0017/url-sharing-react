import React, { useContext } from "react";
import { SettingContext } from "../../../context/SettingsProvider";
import SubscriptionDetails from "./SubscriptionDetails";
import ConnectedAccounts from "./ConnectedAccounts";

export default function AccountManagement() {
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
            onClick={() => setSub("Subscription Details")}
          >
            Subscription Details
          </button>
          <button
            className={btnClass}
            onClick={() => setSub("Connected Accounts")}
          >
            Connected Accounts
          </button>
        </div>
      )}
      {sub === "Subscription Details" && <SubscriptionDetails />}
      {sub === "Connected Accounts" && <ConnectedAccounts />}
    </div>
  );
}
