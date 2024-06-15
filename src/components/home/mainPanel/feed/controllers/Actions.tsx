import { useContext } from "react";
import { HomeContext } from "../../../../../context/HomeProvider";

import FeederBtn from "../../../../FeederBtn";
export default function Actions() {
  const { view, setView } = useContext(HomeContext);
  return (
    <div className="flex gap-2 uppercase text-xs text-blue-950">
      <FeederBtn title="Create" onClick={() => console.log("Create")} />
      <FeederBtn title="Filter" onClick={() => console.log("Filter")} />
      <FeederBtn title="Type" onClick={() => console.log("Type")} />
      <FeederBtn title="Time" onClick={() => console.log("Time")} />
      <FeederBtn
        title={
          view === "grid" ? "Grid" : view === "cardImgIconS" ? "Card" : "List"
        }
        onClick={() =>
          setView(
            view === "grid"
              ? "cardImgIconS"
              : view === "cardImgIconS"
              ? "cardSharedLg"
              : "grid"
          )
        }
      />
    </div>
  );
}
