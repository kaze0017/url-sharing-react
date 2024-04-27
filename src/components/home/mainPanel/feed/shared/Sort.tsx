import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import { PiShareFatThin } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";

interface SortProps {
  setSort: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sort({ setSort }: SortProps) {
  const wrapperClass =
    "text-xs uppercase flex w-[600px] mx-auto  justify-between items-center px-2 py-1 border-b-2 border-gray-500";

  const btnClass =
    "text-gray-700 flex gap-1 justify-center h-full items-center cursor-pointer";
  return (
    <div className={wrapperClass}>
      <div className={btnClass} onClick={() => setSort("rank")}>
        <FiTrendingUp className="text-lg" />
        <p>Most Rank</p>
      </div>
      <div className={btnClass} onClick={() => setSort("shared")}>
        <PiShareFatThin className="text-lg" />
        <p>Most Shared</p>
      </div>
      <div className={btnClass} onClick={() => setSort("saved")}>
        <IoPricetagOutline className="text-lg" />
        <p>Most Saved</p>
      </div>
    </div>
  );
}
