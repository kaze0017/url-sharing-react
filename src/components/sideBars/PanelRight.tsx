import React, { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Suggestions from "./rightPanel/Suggestions";
import Searches from "./rightPanel/Searches";
import ActionBtns from "./topPanel/ActionBtns";
import { useDraggable } from "react-use-draggable-scroll";
import Histories from "./rightPanel/Histories";
import Notifications from "./rightPanel/Notifications";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import {
  setNotifications,
  setToggleRightPanel,
} from "../../state/rightPanel/rightPanelSlice";
import { fetchNotifications } from "../../state/notifications/notificationSlice";

interface PanelLeftProps {
  className?: string;
}

export default function PanelRight(props: PanelLeftProps) {
  const { toggleRightPanel, content } = useSelector(
    (state: RootState) => state.rightPanel
  );
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const dispatch = useDispatch<AppDispatch>();

  const { auth } = useContext(AuthContext);
  const token = auth?.token;

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  function handelRightPanelToggle() {
    dispatch(setToggleRightPanel(!toggleRightPanel));
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

  useEffect(() => {
    async function loadNotifications() {
      const response = dispatch(fetchNotifications());
      // dispatch(setNotifications(response));
    }
    loadNotifications();
    // async function loadNotifications() {
    //   const response = await dispatch(fetchNotifications());
    // }
    // loadNotifications();
  }, [token, dispatch]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 960) {
        dispatch(setToggleRightPanel(true));
      }
    });
  }, [dispatch]);
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
      <ActionBtns />
      {content === "suggestions" && (
        <Suggestions variant={toggleRightPanel ? "collapsed" : "expanded"} />
      )}
      {content === "history" && <Histories />}
      {content === "search" && <Searches />}
      {content === "notifications" && <Notifications />}
    </div>
  );
}
