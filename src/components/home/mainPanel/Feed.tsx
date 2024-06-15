import { useContext } from "react";
import { HomeContext } from "../../../context/HomeProvider";
import Shared from "./feed/Public";
import Wall from "./feed/Saved";
import Trend from "./feed/Trend";
import MainPanelWrapper from "../../MainPanelWrapper";
import Controllers from "./feed/Controllers";

interface feedProps {
  mode: string;
}

export default function Feed(props: feedProps) {
  const { query, setQuery } = useContext(HomeContext);
  return (
    <MainPanelWrapper>
      <Controllers query={query} setQuery={setQuery} />
      {props.mode === "saved" ? <Wall /> : null}
      {props.mode === "public" ? <Shared /> : null}
      {props.mode === "trend" ? <Trend /> : null}
    </MainPanelWrapper>
  );
}
