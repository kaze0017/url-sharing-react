import React from "react";
import { Tabs, Tab } from "@mui/material";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

interface ControllerProps {
  mode: "all" | "people" | "tags" | "categories" | "links";
  setMode: React.Dispatch<
    React.SetStateAction<"all" | "people" | "tags" | "categories" | "links">
  >;
}
export default function Controller({ mode, setMode }: any) {
  const btnClass = "flex-grow text-center cursor-pointer text-gray-400";
  const activeClass = "flex-grow text-center cursor-pointer text-blue-950";
  return (
    // <div className="flex w-full text-xs uppercase font-semibold">
    <Tabs
      value={mode}
      onChange={(event, newValue) => setMode(newValue)}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth"
      scrollButtons="auto"
      orientation="horizontal"
      TabIndicatorProps={{
        style: { display: "none" },
      }}
    >
      <Tab
        icon={<PublicOutlinedIcon titleAccess="All" fontSize="small" />}
        value="all"
        sx={{ minWidth: 10, padding: 0, margin: 0 }}
      />
      <Tab
        icon={<PeopleAltOutlinedIcon titleAccess="People" fontSize="small" />}
        value="people"
        sx={{ minWidth: 10, padding: 0, margin: 0, fontSize: 2 }}
        className="text-sx"
      />
      <Tab
        icon={<LocalOfferOutlinedIcon titleAccess="Tags" fontSize="small" />}
        value="tags"
        sx={{ minWidth: 10, padding: 0, margin: 0 }}
        className="text-2xl"
      />
      <Tab
        icon={
          <CategoryOutlinedIcon titleAccess="Categories" fontSize="small" />
        }
        value="categories"
        sx={{ minWidth: 10, padding: 0, margin: 0 }}
      />
      <Tab
        icon={<LinkOutlinedIcon titleAccess="Links" fontSize="small" />}
        value="links"
        sx={{ minWidth: 10, padding: 0, margin: 0 }}
        className="text-2xl"
      />
    </Tabs>
  );
  {
    /* <div
        className={mode === "all" ? activeClass : btnClass}
        onClick={() => setMode("all")}
      >
        All
      </div>
      <div
        className={mode === "people" ? activeClass : btnClass}
        onClick={() => setMode("people")}
      >
        People
      </div>
      <div
        className={mode === "tags" ? activeClass : btnClass}
        onClick={() => setMode("tags")}
      >
        Tags
      </div>
      <div
        className={mode === "categories" ? activeClass : btnClass}
        onClick={() => setMode("categories")}
      >
        Categories
      </div>
      <div
        className={mode === "links" ? activeClass : btnClass}
        onClick={() => setMode("links")}
      >
        Links
      </div> */
  }
  // </div>
}
