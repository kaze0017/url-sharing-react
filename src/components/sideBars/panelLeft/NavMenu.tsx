import React from "react";
import { menuLinkInterface } from "../../../lib/menu-links";
import NavButton from "../../Buttons";

interface Props {
  toggledCollapse: boolean;
  menuLinks: menuLinkInterface[];
}

export default function NavMenu({ toggledCollapse, menuLinks }: Props) {
  // Button wrapper css classes
  const panelBtnsWrapper = "flex flex-col gap-2";
  return (
    <div className={panelBtnsWrapper}>
      {menuLinks.map((link) => (
        <NavButton
          key={link.id}
          link={link.url}
          icon={link.icon}
          toggledCollapse={toggledCollapse}
        >
          {link.title}
        </NavButton>
      ))}
    </div>
  );
}
