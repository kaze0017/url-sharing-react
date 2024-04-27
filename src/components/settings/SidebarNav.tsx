import React, { useRef } from "react";
import { settingsMenuLinks } from "../../lib/SettingMenus";
import AccordionMenu from "../menus/AccordionMenu";
import SearchBar from "../SearchBar";
import { useDraggable } from "react-use-draggable-scroll";

export default function SidebarNav() {
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
          <AccordionMenu key={menu.id} menu={menu} query={query} />
        ))}
      </div>
    </div>
  );
}
