"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Suggestions from "./rightPanel/Suggestions";
import Searches from "./rightPanel/Searches";
import ActionBtns from "./rightPanel/ActionBtns";
import { useDraggable } from "react-use-draggable-scroll";
import Histories from "./rightPanel/Histories";
import Notifications from "./rightPanel/Notifications";

interface PanelLeftProps {
  className?: string;
}

export default function PanelRight(props: PanelLeftProps) {
  const [toggledCollapse, setToggleCollapse] = useState(false);

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  function handelRightPanelToggle() {
    setToggleCollapse(!toggledCollapse);
  }

  // panel css classes
  const panelWrapper = `flex flex-col items-center gap-1 p-1 pb-2  transition-300 grow h-full overflow-x-hidden overflow-y-hidden scrollbar-hide
  ${
    toggledCollapse ? "min-w-20 w-20 max-w-20" : "min-w-60 w-60 max-w-60"
  } relative
  panel-light
  text-gray-900
  `;
  const toggleButtonClasses = `flex flex-row-reverse cursor-pointer p-4 text-gray items-center w-full h-6 
  ${!toggledCollapse ? "justify-start" : "justify-center"}
  `;
  // const textBoxClass = `text-center ${toggledCollapse ? "w-52" : "w-16"}`;
  const [content, setContent] = useState("suggestions");

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 960) {
        setToggleCollapse(true);
      }
    });
  }, []);
  return (
    <div className={panelWrapper} ref={ref} {...events}>
      <div
        id="RightPanelToggleBtn"
        className={toggleButtonClasses}
        onClick={() => handelRightPanelToggle()}
      >
        {!toggledCollapse ? (
          <FiX className="text-2xl text-gray-800" />
        ) : (
          <FiMenu className="text-2xl text-gray-800 text-center" />
        )}
      </div>
      <ActionBtns
        variant={toggledCollapse ? "collapsed" : "expanded"}
        setContent={setContent}
      />
      {content === "suggestions" && (
        <Suggestions variant={toggledCollapse ? "collapsed" : "expanded"} />
      )}
      {content === "history" && <Histories />}
      {content === "search" && <Searches />}
      {content === "notifications" && <Notifications />}
    </div>
  );
}
