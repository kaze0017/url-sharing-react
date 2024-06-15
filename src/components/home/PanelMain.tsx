import Feed from "./mainPanel/Feed";
import { useContext } from "react";
import { HomeContext } from "../../context/HomeProvider";

interface Props {
  mode: string;
}

export default function PanelMain(props: Props) {
  const { mode, setMode } = useContext(HomeContext);
  const wrapperClass = "flex flex-col fle-grow gap-1 overflow-hidden";
  return <Feed mode={mode} />;
}
