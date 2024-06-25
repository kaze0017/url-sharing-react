import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../state/store";
import FeederBtn from "../../../../FeederBtn";
import { setView } from "../../../../../state/home/homeSlice";

export default function Actions() {
  const { view } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch();

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
        onClick={() => dispatch(setView())}
      />
    </div>
  );
}
