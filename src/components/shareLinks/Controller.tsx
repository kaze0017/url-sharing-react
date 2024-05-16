import React from "react";
import { useNavigate } from "react-router-dom";

export default function Controller() {
  const navigate = useNavigate();

  function shareWithGroup() {
    navigate("/shareLinks/shareWithGroups");
  }

  const btnClass =
    "font-bold font-blue-950 bg-gray-200 text-center justify-center uppercase flex items-center gap-1 p-2 hover:bg-indigo-100 cursor-pointer h-[150px] w-[150px] rounded-lg border border-gray-300";
  return (
    <div className="flex  flex-wrap flex-grow overflow-hidden w-full h-full items-center gap-3 justify-center">
      <button className={btnClass} onClick={shareWithGroup}>
        Share with group/people
      </button>
      <button className={btnClass}>Share with Graph</button>
      <button className={btnClass}>Share with ....</button>
    </div>
  );
}
