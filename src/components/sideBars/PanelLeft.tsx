"use client";
import { useState, useRef, useEffect, useContext } from "react";
import { getOwner } from "../../lib/actions";
import menuLinks from "../../lib/menu-links";
import LogoProfile from "../LogoProfile";
import { useDraggable } from "react-use-draggable-scroll";
import UserInfo from "./panelLeft/UserInfo";
import NavMenu from "./panelLeft/NavMenu";
import Toggle from "./panelLeft/Toggle";
import { UserProfileContext } from "../../context/UserProfileProvider";

interface PanelLeftProps {
  className?: string;
}

const PanelLeft: React.FC<PanelLeftProps> = ({ className }) => {
  // Hooks
  const [toggledCollapse, setToggleCollapse] = useState(false);

  // panel css classes
  const panelWrapper = `flex flex-col items-center gap-1 p-1 pb-2  transition-300 grow h-full overflow-x-hidden overflow-y-hidden scrollbar-hide
  ${
    toggledCollapse ? "min-w-20 w-20 max-w-20" : "min-w-60 w-60 max-w-60"
  } relative
  panel-light
  text-gray-900
  `;

  //  Space div css classes
  const growingDivClasses = "flex flex-grow";

  const user = getOwner();

  // functions
  const handelLeftPanelToggle = () => {
    setToggleCollapse(!toggledCollapse);
  };

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 960) {
        setToggleCollapse(true);
      }
    });
  }, []);

  return (
    <div ref={ref} className={panelWrapper} {...events}>
      <Toggle
        toggledCollapse={toggledCollapse}
        handelLeftPanelToggle={handelLeftPanelToggle}
      />
      <UserInfo user={user} toggledCollapse={toggledCollapse} />
      <NavMenu toggledCollapse={toggledCollapse} menuLinks={menuLinks} />
      <div className={growingDivClasses}></div>
      <LogoProfile toggledCollapse={toggledCollapse} />
    </div>
  );
};

export default PanelLeft;
