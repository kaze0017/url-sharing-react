import React from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../state/store";
import { setToggled } from "../../../state/leftPanel/leftPanelSlice";



export default function Toggle() {
   

  const { toggled : leftPanelToggled } = useSelector((state: RootState) => state.leftPanel);
  const dispatch = useDispatch();
  // toggle button css classes
  const toggleButtonClasses = `flex flex-row-reverse cursor-pointer p-4 text-gray items-center  h-6 w-full 
  ${!leftPanelToggled ? "justify-start" : "justify-center"}
  `;
  return (
    <div
      id="leftPanelToggleBtn"
      className={toggleButtonClasses}
      onClick={() => dispatch(setToggled(!leftPanelToggled))}
    >
      {!leftPanelToggled ? (
        <FiX className="text-2xl text-gray-800" />
      ) : (
        <FiMenu className="text-2xl text-gray-800 text-center" />
      )}
    </div>
  );
}
