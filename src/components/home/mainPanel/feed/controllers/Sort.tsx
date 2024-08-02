import { FiTrendingUp } from "react-icons/fi";
import { PiShareFatThin } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../state/store";
import { setSortBy } from "../../../../../state/home/homeSlice";
import { Tabs, Tab } from "@mui/material";

export default function Sort() {
  const sortBy = useSelector((state: RootState) => state.home.sortBy);
  const dispatch = useDispatch();

  function handleSortBy(e: "rank" | "shared" | "saved") {
    console.log(e);
    dispatch(setSortBy(e));
  }

  const wrapperClass =
    "text-xs uppercase flex w-[600px] mx-auto justify-between items-center px-2 py-1 border-b-2 border-gray-500";

  const active =
    "flex gap-1 justify-center h-full items-center active-primary hover-primary cursor-pointer";
  const inactive =
    "flex gap-1 justify-center h-full items-center inactive-primary hover-primary cursor-pointer";

  return (
    <div className="flex items-center justify-center w-full">
      <Tabs
        value={sortBy}
        onChange={(event, newValue) => handleSortBy(newValue)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        scrollButtons="auto"
        orientation="horizontal"
        TabIndicatorProps={{
          style: { display: "none" },
        }}
        sx={{
          minWidth: 50,
          minHeight: 10,
          padding: 1,
          margin: 0,
          borderBottom: 1,
          borderColor: "divider",
          maxWidth: 600,
        }}
      >
        <Tab
          label="Most Rank"
          value="rank"
          icon={<FiTrendingUp />}
          iconPosition="start"
          sx={{ minWidth: 150, minHeight: 10, padding: 1, margin: 0 }}
        />
        <Tab
          label="Most Shared"
          value="shared"
          icon={<PiShareFatThin />}
          iconPosition="start"
          sx={{ minWidth: 150, minHeight: 10, padding: 1, margin: 0 }}
        />
        <Tab
          label="Most Saved"
          value="saved"
          icon={<IoPricetagOutline />}
          iconPosition="start"
          sx={{ minWidth: 150, minHeight: 10, padding: 1, margin: 0 }}
        />
      </Tabs>
    </div>
    // <div className={wrapperClass}>
    //   <div
    //     className={` text-lg ${sortBy === "rank" ? active : inactive}`}
    //     onClick={() => handleSortBy("rank")}
    //   >
    //     <FiTrendingUp className="text-lg" />
    //     <p>Most Rank</p>
    //   </div>
    //   <div
    //     className={` text-lg ${sortBy === "shared" ? active : inactive}`}
    //     onClick={() => handleSortBy("shared")}
    //   >
    //     <PiShareFatThin className="text-lg" />
    //     <p>Most Shared</p>
    //   </div>
    //   <div
    //     className={` text-lg ${sortBy === "saved" ? active : inactive}`}
    //     onClick={() => handleSortBy("saved")}
    //   >
    //     <IoPricetagOutline className="text-lg" />
    //     <p>Most Saved</p>
    //   </div>
    // </div>
  );
}
