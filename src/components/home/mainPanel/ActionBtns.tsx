import React from "react";
import { FiEye } from "react-icons/fi";
import { FiCompass } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";

interface Props {
  setMode: (a: string) => void;
  panelMainMode: string;
}

export default function ActionBtns(props: Props) {
  const active = "text-blue-500 text-2xl";
  const inactive = "text-gray-600 text-2xl";

  return (
    <div className="flex flex-row w-full gap-4 p-1 items-center justify-center text-gray-600 panel-light">
      <div className="flex  w-[25%] ml-2 border border-gray-600 "></div>
      <div className="flex flex-col items-center">
        <FiEye
          onClick={() => props.setMode("wall")}
          className={props.panelMainMode === "wall" ? active : inactive}
        />
      </div>
      <div className="flex flex-col items-center">
        <FiCompass
          className={props.panelMainMode === "shared" ? active : inactive}
          onClick={() => props.setMode("shared")}
        />
      </div>
      <div className="flex flex-col items-center">
        <FiTrendingUp
          className={props.panelMainMode === "trend" ? active : inactive}
          onClick={() => props.setMode("trend")}
        />
      </div>
      <div className="flex w-[25%] mr-2 border border-gray-600 "></div>
    </div>
  );
}
