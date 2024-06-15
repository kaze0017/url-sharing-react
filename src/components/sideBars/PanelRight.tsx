import React, { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { RightPanelContext } from "../../context/RightPanelProvider";
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Suggestions from "./rightPanel/Suggestions";
import Searches from "./rightPanel/Searches";
import ActionBtns from "./rightPanel/ActionBtns";
import { useDraggable } from "react-use-draggable-scroll";
import Histories from "./rightPanel/Histories";
import Notifications from "./rightPanel/Notifications";
import { getNotifications } from "../../api/getNotifications";

interface PanelLeftProps {
  className?: string;
}

export default function PanelRight(props: PanelLeftProps) {
  const {
    toggleRightPanel,
    setToggleRightPanel,
    notifications,
    setNotifications,
    content,
  } = useContext(RightPanelContext);

  const { auth } = useContext(AuthContext);
  const token = auth?.token;

  // const orgNotifications = getNotifications(token || "");
  // setNotifications(orgNotifications);

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  function handelRightPanelToggle() {
    setToggleRightPanel(!toggleRightPanel);
  }

  // panel css classes
  const panelWrapper = `flex flex-col items-center gap-1 p-1 pb-2  transition-300 grow h-full overflow-x-hidden overflow-y-hidden scrollbar-hide
  ${
    toggleRightPanel ? "min-w-20 w-20 max-w-20" : "min-w-60 w-60 max-w-60"
  } relative
  panel-light
  text-gray-900
  `;
  const toggleButtonClasses = `flex flex-row-reverse cursor-pointer p-4 text-gray items-center w-full h-6 
  ${!toggleRightPanel ? "justify-start" : "justify-center"}
  `;
  // const textBoxClass = `text-center ${toggledCollapse ? "w-52" : "w-16"}`;

  async function retrieveNotifications() {
    console.log("user id: ", auth?.userProfile?.id);
    const response = await getNotifications(token || "");
    setNotifications(response);
    console.log(response);
  }

  useEffect(() => {
    retrieveNotifications();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 960) {
        setToggleRightPanel(true);
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
        {!toggleRightPanel ? (
          <FiX className="text-2xl text-gray-800" />
        ) : (
          <FiMenu className="text-2xl text-gray-800 text-center" />
        )}
      </div>
      <ActionBtns
        variant={toggleRightPanel ? "collapsed" : "expanded"}
        notifications={notifications.length || 0}
      />
      {content === "suggestions" && (
        <Suggestions variant={toggleRightPanel ? "collapsed" : "expanded"} />
      )}
      {content === "history" && <Histories />}
      {content === "search" && <Searches />}
      {content === "notifications" && <Notifications />}
    </div>
  );
}
