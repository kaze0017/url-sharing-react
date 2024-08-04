import HotSharedLinks from "./topPanel/HotSharedLinks";
import HotCategories from "./topPanel/HotCategories";
import Container from "@mui/material/Container";

interface PanelTopProps {
  mode: "wall" | "link";
}

export default function PanelTop({ mode }: PanelTopProps) {
  return (
    // <div className="panel-light p-2 flex flex-col gap-1">
    <div className="panel-light p-1 flex-col flex gap-1">
      <HotSharedLinks mode={mode} />
      <HotCategories />
    </div>
    // </div>
  );
}
