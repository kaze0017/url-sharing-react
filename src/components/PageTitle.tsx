import React from "react";
import { menuLinkInterface } from "../lib/menu-links";

interface PageTitleProps {
  menu: menuLinkInterface;
  component?: React.ComponentType;
}

export default function PageTitle({ menu, component }: PageTitleProps) {
  return (
    <div className="uppercase flex p-4  border-b-2 border-indigo-700 mx-2 mb-1">
      <a
        className="text-indigo-600 text-3xl font-bold ml-2 uppercase"
        href={menu.url}
      >
        <div className="flex gap-2 items-center">
          {menu.icon && <span>{React.createElement(menu.icon)}</span>}
          <h2>{menu.title}</h2>
        </div>
      </a>
      <div className="flex flex-grow"></div>

      {component && React.createElement(component)}
    </div>
  );
}
