import { useState } from "react";
import PanelTop from "../home/PanelTop";
import PanelMain from "../home/PanelMain";

export default function PanelMiddle() {
  const [panelTopMode, setPanelTopMode] = useState<"wall" | "link">("wall");
  const [panelMainMode, setPanelMainMode] = useState("shared");
  const wrapperClass = "flex flex-col grow gap-2 w-full overflow-hidden";
  return (
    <div className={wrapperClass}>
      <PanelTop mode={panelTopMode} />
      <PanelMain mode={panelMainMode} />
      {/* <ActionBtns setMode={setPanelMainMode} panelMainMode={panelMainMode} /> */}
    </div>
  );
}
