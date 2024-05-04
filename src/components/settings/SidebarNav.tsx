import React, { useRef, useContext } from "react";
import { settingsMenuLinks } from "../../lib/SettingMenus";
import AccordionMenu from "../menus/AccordionMenu";
import SearchBar from "../SearchBar";
import { useDraggable } from "react-use-draggable-scroll";
import { SettingContext } from "../../context/SettingsProvider";

export default function SidebarNav() {

  const { main, sub, setMain, setSub } = useContext(SettingContext);
  
  const [query, setQuery] = React.useState("");
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  return (
    <div
      className="panel-light flex flex-col gap-2 p-2 overflow-x-hidden overflow-y-scroll scrollbar-hide "
      {...events}
      ref={ref}
    >
      <SearchBar query={query} setQuery={setQuery} />
      <div className="w-full">
        {settingsMenuLinks.map((menu) => (
          <AccordionMenu key={menu.id} menu={menu} query={query} setMain={setMain} setSub={setSub} />
        ))}
      </div>
    </div>
  );
}
