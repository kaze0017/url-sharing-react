import menuLinks from "../lib/menu-links";
import PageTitle from "../components/PageTitle";
import MainPanel from "../components/membermanagement/MainPanel";
import FeedMenu from "../components/membermanagement/FeedMenu";
import { Outlet } from "react-router-dom";
import NetworksProvider from "../context/NetworksProvider";
import MainPanelWrapper from "../components/MainPanelWrapper";
import ReactTree from "../components/membermanagement/graphs/ReactTree";
import TreeChart from "../components/membermanagement/TreeChartCopy";
import { data } from "../lib/data2";
import { getNPeople } from "../lib/actions";
import { ChartDragAndDropProvider } from "../context/ChartDragAndDropProvider";
import PageTitleComponent from "../components/membermanagement/PageTitleComponent";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
export default function MemberManagement() {
  const people = getNPeople(10);

  const orgData = {
    id: 31,
    name: "John Doe",
    profile_picture: people[4].profile_picture,
    children: [
      {
        id: 32,
        name: "Jane Smith",
        profile_picture: people[2].profile_picture,
        children: [
          {
            id: 33,
            name: "John Smith",
            profile_picture: people[3].profile_picture,
            children: [
              {
                id: 34,
                name: "Jane Doe",
                profile_picture: people[4].profile_picture,
              },
              {
                id: 35,
                name: "Jane Doe",
                profile_picture: people[5].profile_picture,
              },
            ],
          },
        ],
      },
      {
        id: 36,
        name: "Jane Smith",
        profile_picture: people[6].profile_picture,
      },
      {
        id: 37,
        name: "Jane Smith",
        profile_picture: people[3].profile_picture,
        children: [
          {
            id: 38,
            name: "John Smith",
            profile_picture: people[6].profile_picture,
            children: [
              {
                id: 39,
                name: "Jane Doe",
                profile_picture: people[5].profile_picture,
              },
              {
                id: 40,
                name: "Jane Doe",
                profile_picture: people[4].profile_picture,
              },
            ],
          },
        ],
      },
    ],
  };
  return (
    <NetworksProvider>
      <MainPanelWrapper>
        <ChartDragAndDropProvider>
          <PageTitle menu={menuLinks[2]} component={PageTitleComponent} />
          <DndProvider backend={HTML5Backend}>
            <Outlet />
          </DndProvider>
        </ChartDragAndDropProvider>
      </MainPanelWrapper>
    </NetworksProvider>
  );
}
