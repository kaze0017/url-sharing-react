import React, { useEffect, useState } from "react";
import { settingsMenuLinkInterface } from "../../lib/SettingMenus";

interface AccordionMenuProps {
  menu: settingsMenuLinkInterface;
  query?: string;
}

export default function AccordionMenu({ menu, query }: AccordionMenuProps) {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const submenuLength = menu.submenus?.length || 0;

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
    <div className="py-1 uppercase">
      <button
        className="p-1 flex w-full font-bold text-sm items-center gap-2 text-gray-500 uppercase hover:bg-slate-300"
        onClick={() => setAccordionOpen(!accordionOpen)}
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
            className="overflow-hidden hover:bg-slate-300"
          >
            <a href={submenu.url}>
              <span>
                {submenu.icon && (
                  <span>{React.createElement(submenu.icon)}</span>
                )}
              </span>
              <span>{submenu.title}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
