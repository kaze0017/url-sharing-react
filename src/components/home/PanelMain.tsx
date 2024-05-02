import Feed from "./mainPanel/Feed";
import { useContext } from "react";
import { ModeContext } from "../../context/ModeProvider";

interface Props {
  mode: string;
}

export default function PanelMain(props: Props) {
  const { mode, setMode } = useContext(ModeContext);
  const wrapperClass = "flex flex-col grow gap-1 overflow-hidden";
  return (
    <div className={wrapperClass}>
      <Feed mode={mode} />
    </div>
  );
}
