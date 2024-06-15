import { useContext } from "react";
import { HomeContext } from "../../../../../context/HomeProvider";
import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import { PiShareFatThin } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";

export default function Sort() {
  const { sortBy, setSortBy } = useContext(HomeContext);

  function handleSortBy(e: "rank" | "shared" | "saved") {
    
    setSortBy(e);
  }

  const wrapperClass =
    "text-xs uppercase flex w-[600px] mx-auto justify-between items-center px-2 py-1 border-b-2 border-gray-500";

  const btnClass =
    "text-gray-700 flex gap-1 justify-center h-full items-center cursor-pointer";

  return (
    <div className={wrapperClass}>
      <div className={btnClass} onClick={() => handleSortBy("rank")}>
        <FiTrendingUp
          className={` text-lg ${sortBy === "rank" ? "text-blue-500" : ""}`}
        />
        <p>Most Rank</p>
      </div>
      <div className={btnClass} onClick={() => handleSortBy("shared")}>
        <PiShareFatThin className={` text-lg ${sortBy === "shared" ? "text-blue-500" : ""}`} />
        <p>Most Shared</p>
      </div>
      <div className={btnClass} onClick={() => handleSortBy("saved")}>
        <IoPricetagOutline className={` text-lg ${sortBy === "saved" ? "text-blue-500" : ""}`} />
        <p>Most Saved</p>
      </div>
    </div>
  );
}
