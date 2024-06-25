import Shared from "./feed/Public";
import Wall from "./feed/Saved";
import Trend from "./feed/Trend";
import MainPanelWrapper from "../../MainPanelWrapper";
import Controllers from "./feed/Controllers";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

export default function Feed() {
  const mode = useSelector((state: RootState) => state.home.mode);
  return (
    <MainPanelWrapper>
      <Controllers />
      {mode === "saved" ? <Wall /> : null}
      {mode === "public" ? <Shared /> : null}
      {mode === "trend" ? <Trend /> : null}
    </MainPanelWrapper>
  );
}
