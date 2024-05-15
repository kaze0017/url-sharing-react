import React, { useContext } from "react";
import { SettingContext } from "../../context/SettingsProvider";
import { settingsMenuLinkInterface } from "../../lib/SettingMenus";

interface PanelMenuProps {
  menu: settingsMenuLinkInterface;
}

export default function PanelMenu({ menu }: PanelMenuProps) {
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
          <div className="text-8xl">
            {menu.icon && React.createElement(menu.icon)}
          </div>
          {menu.submenus?.map((submenu) => (
            <button
              key={submenu.title}
              className={btnClass}
              onClick={() => setSub(submenu.title)}
            >
              {submenu.title}
            </button>
          ))}
          {/* <button className={btnClass} onClick={() => setSub("My Promotions")}>
            My Promotions
          </button> */}
        </div>
      )}
    </div>
  );
}
