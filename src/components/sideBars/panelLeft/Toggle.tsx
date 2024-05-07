import React from "react";
import { FiMenu, FiX } from "react-icons/fi";

interface Props {
    toggledCollapse: boolean;
    handelLeftPanelToggle: () => void;
    }

export default function Toggle({ toggledCollapse, handelLeftPanelToggle }: Props) {
  // toggle button css classes
  const toggleButtonClasses = `flex flex-row-reverse cursor-pointer p-4 text-gray items-center  h-6 w-full 
  ${!toggledCollapse ? "justify-start" : "justify-center"}
  `;
  return (
    <div
      id="leftPanelToggleBtn"
      className={toggleButtonClasses}
      onClick={() => handelLeftPanelToggle()}
    >
      {!toggledCollapse ? (
        <FiX className="text-2xl text-gray-800" />
      ) : (
        <FiMenu className="text-2xl text-gray-800 text-center" />
      )}
    </div>
  );
}
