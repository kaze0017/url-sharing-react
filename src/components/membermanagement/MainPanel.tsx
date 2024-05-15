import { useContext, useEffect } from "react";
import { NetworksContext } from "../../context/NetworksProvider";
import FeedMenu from "./FeedMenu";
import Graph from "./graphs/Graph";
import GroupSm from "../groups/GroupSm";
import { groupOne, groupTwo, groupThree } from "../../lib/placeholder-data";
import { networkMenu } from "../../lib/NetworkMenu";
import { Link } from "react-router-dom";
import NetworksProvider from "../../context/NetworksProvider";
import MainPanelWrapper from "../MainPanelWrapper";

export default function MainPanel() {
  const groupsToDisplay = [groupOne, groupTwo, groupThree];

  const { type, view } = useContext(NetworksContext);

  useEffect(() => {
    console.log("Type: ", type);
  }, [type]);

  return (
    <MainPanelWrapper>
      <FeedMenu query="" setQuery={() => {}} />
      {type === "all" || type === "graphs" ? (
        <div className="flex flex-col w-full gap-2">
          <h2 className="text-gray-800 uppercase">Graphs</h2>
          <div className="flex flex-wrap gap-2 w-full">
            <Graph width={300} height={300} />
            <Graph width={300} height={300} />
          </div>
        </div>
      ) : null}

      {type === "all" || type === "groups" ? (
        <div className="flex flex-col w-full gap-2">
          <h2 className="text-gray-800 uppercase">Groups</h2>
          <div className="flex flex-wrap gap-2 w-full">
            {groupsToDisplay.map((group) => {
              return (
                <Link to={`/networks/editor/${"g" + group.id}`} key={group.id}>
                  <GroupSm group={group} />
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </MainPanelWrapper>
  );
}
