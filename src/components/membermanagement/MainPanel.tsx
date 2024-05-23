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
import MenuBtnCard from "../menus/btns/MenuBtnCard";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { PiGraphLight } from "react-icons/pi";
import { TbWorldUpload } from "react-icons/tb";
import Relations from "./Relations";
import Groups from "./Groups";
import Graphs from "./Graphs";
import RelationsProvider from "../../context/RelationsProvider";

export default function MainPanel() {
  const groupsToDisplay = [groupOne, groupTwo, groupThree];

  const { type, view, setType } = useContext(NetworksContext);
  useEffect(() => {
    setType("none");
  }, []);

  return (
    <RelationsProvider>
      <MainPanelWrapper>
        {type === "none" && (
          <div className="flex flex-wrap gap-5 flex-grow items-center justify-center">
            <MenuBtnCard
              icon={HiOutlineUserGroup}
              title="Groups"
              callBacFunc={() => setType("groups")}
            />
            <MenuBtnCard
              icon={PiGraphLight}
              title="Graphs"
              callBacFunc={() => setType("graphs")}
            />
            <MenuBtnCard
              icon={TbWorldUpload}
              title="Relations"
              callBacFunc={() => setType("relations")}
            />
          </div>
        )}
        {type === "relations" && <Relations />}
        {type === "graphs" && <Graphs />}
        {type === "groups" && <Groups />}

        {/* <FeedMenu query="" setQuery={() => {}} />
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
      ) : null} */}
      </MainPanelWrapper>
    </RelationsProvider>
  );
}
