import React from "react";
import { menuLinkInterface } from "../lib/menu-links";
import { Link } from "react-router-dom";

interface PageTitleProps {
  menu: menuLinkInterface;
  component?: React.ComponentType;
}

export default function PageTitle({ menu, component }: PageTitleProps) {
  return (
    <div className="uppercase flex items-center border-b-2 border-indigo-700 mx-2 mb-1 h-20 max-h-20 min-h-20 ">
      <Link
        to={menu.url}
        className="text-indigo-600 text-3xl font-bold ml-2 uppercase"
      >
        <div className="flex gap-2 items-center">
          {menu.icon && <span>{React.createElement(menu.icon)}</span>}
          <h2>{menu.title}</h2>
        </div>
      </Link>
      <div className="flex flex-grow"></div>

      {component && React.createElement(component)}
    </div>
  );
}
