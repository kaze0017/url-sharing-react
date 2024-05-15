import Shared from "./feed/Shared";
import Wall from "./feed/Wall";
import Trend from "./feed/Trend";
import MainPanelWrapper from "../../MainPanelWrapper";

interface feedProps {
  mode: string;
}

export default function Feed(props: feedProps) {
  return (
    <MainPanelWrapper>
      {props.mode === "shared" ? <Shared /> : null}
      {props.mode === "wall" ? <Wall /> : null}
      {props.mode === "trend" ? <Trend /> : null}
    </MainPanelWrapper>
  );
}
