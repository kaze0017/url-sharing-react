import React, { useEffect, useState, useContext } from "react";
import { settingsMenuLinkInterface } from "../../lib/SettingMenus";
import { SettingContext } from "../../context/SettingsProvider";
import { mainList } from "../../lib/SettingMenus";
import { mainListType } from "../../lib/SettingMenus";
import { subListType } from "../../lib/SettingMenus";
import { subList } from "../../lib/SettingMenus";
import { set } from "react-hook-form";

interface AccordionMenuProps {
  menu: settingsMenuLinkInterface;
  query?: string;
  setMain?: React.Dispatch<React.SetStateAction<mainListType>>;
  setSub?: React.Dispatch<React.SetStateAction<subListType | "">>;
}

export default function AccordionMenu({
  menu,
  query = "",
  setMain,
  setSub,
}: AccordionMenuProps) {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const submenuLength = menu.submenus?.length || 0;

  function handleMainMenuClick(title: string) {
    if (setMain) {
      setMain(menu.title as mainListType);
      if (setSub) {
        setSub("");
      }
    }
    setAccordionOpen(!accordionOpen);
  }

  function handleSubMenuClick(title: string) {
    if (setSub) {
      setSub(title as subListType);
    }
    if (setMain) {
      setMain(menu.title as mainListType);
    }
  }

  useEffect(() => {
    if (query) {
      let found = false;
      menu.submenus?.forEach((submenu) => {
        if (submenu.title.toLowerCase().includes(query.toLowerCase())) {
          found = true;
        }
      });
      if (found) {
        setAccordionOpen(true);
      } else {
        setAccordionOpen(false);
      }
    } else {
      setAccordionOpen(false);
    }
  }, [query]);
  return (
    <div className="py-1 uppercase text-left">
      <button
        className="p-1 flex w-full font-bold text-sm items-center gap-2 text-gray-500 uppercase hover:bg-slate-300"
        onClick={() => handleMainMenuClick(menu.title)}
      >
        {menu.icon && <span>{React.createElement(menu.icon)}</span>}{" "}
        <span>{menu.title}</span>
        <span className="flex flex-grow"></span>
        <span className="">{accordionOpen ? "▲" : "▼"}</span>
      </button>

      <div
        className={`text-xs grid overflow-hidden pl-6 transition-all duration-300 ease-in-out ${
          accordionOpen
            ? `grid-rows-[${
                submenuLength > 0 ? submenuLength : 1
              }fr] opacity-100`
            : `grid-rows-[0fr] opacity-0 h-0`
        } gap-1`}
      >
        {menu.submenus?.map((submenu) => (
          <div
            key={submenu.title}
            className="overflow-hidden hover:bg-slate-300  "
          >
            <button
              onClick={() => handleSubMenuClick(submenu.title)}
              className="p-1 w-full  text-left"
            >
              <span>
                {submenu.icon && (
                  <span>{React.createElement(submenu.icon)}</span>
                )}
              </span>
              <span>{submenu.title}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
