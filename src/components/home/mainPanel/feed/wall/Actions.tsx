import FeederBtn from "../../../../FeederBtn";
export default function Actions() {
  return (
    <div className="flex gap-2 uppercase text-xs text-blue-950">
      <FeederBtn title="Create" onClick={() => console.log("Create")} />
      <FeederBtn title="Filter" onClick={() => console.log("Filter")} />
      <FeederBtn title="Type" onClick={() => console.log("Type")} />
      <FeederBtn title="Time" onClick={() => console.log("Time")} />
      <FeederBtn title="View" onClick={() => console.log("View")} />
    </div>
  );
}
