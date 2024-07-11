import { FiTrendingUp } from "react-icons/fi";
import { PiShareFatThin } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../state/store";
import { setSortBy } from "../../../../../state/home/homeSlice";

export default function Sort() {
  const sortBy = useSelector((state: RootState) => state.home.sortBy);
  const dispatch = useDispatch();

  function handleSortBy(e: "rank" | "shared" | "saved") {
    dispatch(setSortBy(e));
  }

  const wrapperClass =
    "text-xs uppercase flex w-[600px] mx-auto justify-between items-center px-2 py-1 border-b-2 border-gray-500";

  const active =
    "flex gap-1 justify-center h-full items-center active-primary hover-primary cursor-pointer";
  const inactive =
    "flex gap-1 justify-center h-full items-center inactive-primary hover-primary cursor-pointer";

  return (
    <div className={wrapperClass}>
      <div
        className={` text-lg ${sortBy === "rank" ? active : inactive}`}
        onClick={() => handleSortBy("rank")}
      >
        <FiTrendingUp className="text-lg" />
        <p>Most Rank</p>
      </div>
      <div
        className={` text-lg ${sortBy === "shared" ? active : inactive}`}
        onClick={() => handleSortBy("shared")}
      >
        <PiShareFatThin className="text-lg" />
        <p>Most Shared</p>
      </div>
      <div
        className={` text-lg ${sortBy === "saved" ? active : inactive}`}
        onClick={() => handleSortBy("saved")}
      >
        <IoPricetagOutline className="text-lg" />
        <p>Most Saved</p>
      </div>
    </div>
  );
}
