import Feed from "./mainPanel/Feed";
import { useContext } from "react";
import { ModeContext } from "../../context/ModeProvider";
import MainPanelWrapper from "../MainPanelWrapper";

interface Props {
  mode: string;
}

export default function PanelMain(props: Props) {
  const { mode, setMode } = useContext(ModeContext);
  const wrapperClass = "flex flex-col fle-grow gap-1 overflow-hidden";
  return <Feed mode={mode} />;
}
