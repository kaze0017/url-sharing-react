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
import { RootState, AppDispatch } from "../../state/store";
import { loadTopUsers, setToggled } from "../../state/leftPanel/leftPanelSlice";
import Paper from "@mui/material/Paper";

interface PanelLeftProps {
  className?: string;
}

const PanelLeft: React.FC<PanelLeftProps> = ({ className }) => {
  const { toggled: leftPanelToggle } = useSelector(
    (state: RootState) => state.leftPanel
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  // panel css classes
  const panelWrapper = `w-full flex flex-col items-center gap-1 p-1 pb-2  transition-300 h-full overflow-x-hidden overflow-y-hidden scrollbar-hide
 relative
 text-gray-900
 `;
  // panel-light
  //  Space div css classes
  const growingDivClasses = "flex flex-grow";

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  useEffect(() => {
    async function init() {
      await dispatch(loadTopUsers());
    }
    init();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 960) {
        dispatch(setToggled(true));
      }
    });
  }, []);

  return (
    <Paper>
      <div ref={ref} className={panelWrapper} {...events}>
        <Toggle />
        <UserInfo user={user} toggledCollapse={leftPanelToggle} />
        <NavMenu toggledCollapse={leftPanelToggle} menuLinks={menuLinks} />
        <div className={growingDivClasses}></div>
        <LogoProfile toggledCollapse={leftPanelToggle} />
      </div>
    </Paper>
  );
};

export default PanelLeft;
