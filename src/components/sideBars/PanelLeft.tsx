"use client";
import { useState, useRef, useEffect, useContext } from "react";
import { getOwner } from "../../lib/actions";
import menuLinks from "../../lib/menu-links";
import LogoProfile from "../LogoProfile";
import { useDraggable } from "react-use-draggable-scroll";
import UserInfo from "./panelLeft/UserInfo";
import NavMenu from "./panelLeft/NavMenu";
import Toggle from "./panelLeft/Toggle";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { setToggled } from "../../state/leftPanel/leftPanelSlice";

interface PanelLeftProps {
  className?: string;
}

const PanelLeft: React.FC<PanelLeftProps> = ({ className }) => {
  const { toggled: leftPanelToggle } = useSelector(
    (state: RootState) => state.leftPanel
  );
  const dispatch = useDispatch();

  // Hooks
  // const [toggledCollapse, setToggleCollapse] = useState(false);

  // panel css classes
  const panelWrapper = `w-full flex flex-col items-center gap-1 p-1 pb-2  transition-300 h-full overflow-x-hidden overflow-y-hidden scrollbar-hide
 relative
  panel-light
  text-gray-900
  `;
  //  Space div css classes
  const growingDivClasses = "flex flex-grow";

  const user = getOwner();

  // // functions
  // const handelLeftPanelToggle = () => {
  //   setToggleCollapse(!leftPanelToggle);
  // };

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 960) {
        dispatch(setToggled(true));
      }
    });
  }, []);

  return (
    <div ref={ref} className={panelWrapper} {...events}>
      <Toggle />
      <UserInfo user={user} toggledCollapse={leftPanelToggle} />
      <NavMenu toggledCollapse={leftPanelToggle} menuLinks={menuLinks} />
      <div className={growingDivClasses}></div>
      <LogoProfile toggledCollapse={leftPanelToggle} />
    </div>
  );
};

export default PanelLeft;
