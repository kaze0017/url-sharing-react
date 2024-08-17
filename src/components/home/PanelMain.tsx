import Feed from "./mainPanel/Feed";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../state/topPanel/topPanelSlice";

interface Props {
  mode: string;
}

export default function PanelMain(props: Props) {
  const dispatch = useDispatch();
  dispatch(setPageTitle("Home"));
  return <Feed />;
}
