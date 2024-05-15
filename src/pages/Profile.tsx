import { getPersonById } from "../lib/actions";
import { PersonType, SharedLinkType } from "../lib/interfaces";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import GrabScroll from "../components/GrabScroll";
import CardSharedMd from "../components/cards/CardSharedMd";
import CardSharedLg from "../components/cards/CardSharedLg";
import PageTitle from "../components/profile/PageTitle";
import Controls from "../components/profile/Controls";
import AuthContext from "../context/AuthProvider";
import axiosInstance from "../api/axios";
import { USER_URL } from "../constants";

import { getSharedLinks } from "../api/axios";
import NotFound from "../components/NotFound";

export default function Profile() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";

  const params = useParams();
  const { userId } = params as { userId: string };

  //  const userIdString = stringify(userId);
  const person = regenerateUser({ userId });

  const [sharedLinks, setSharedLinks] = useState<SharedLinkType[] | null>(null);
  const [linksToDisplay, setLinksToDisplay] = useState<SharedLinkType[] | null>(
    null
  );
  const [displayStyle, setDisplayStyle] = useState<"grid" | "list">("grid");
  const [activeType, setActiveType] = useState("all");
  const [query, setQuery] = useState<string>("");

  // const URL = "http://18.224.166.225:8000/link_management/user_links/";

  function handleType(type: string) {
    if (!sharedLinks) {
      return;
    }
    if (type === "all") {
      setLinksToDisplay(sharedLinks);
      return;
    }
    const filteredLinks = sharedLinks.filter((sharedLink) =>
      sharedLink.category?.includes(type)
    );
    setLinksToDisplay(filteredLinks);
  }

  // const ref =
  //   useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  // const { events } = useDraggable(ref);
  async function getAndSetSharedLinks() {
    const sharedLinks = await getSharedLinks(token);
    setSharedLinks(sharedLinks);
    setLinksToDisplay(sharedLinks);
  }

  useEffect(() => {
    if (!sharedLinks) {
      return;
    }
    if (query === "") {
      setLinksToDisplay(sharedLinks);
      return;
    }
    const filteredLinks = sharedLinks?.filter((sharedLink) =>
      sharedLink.title.toLowerCase().includes(query.toLowerCase())
    );
    setLinksToDisplay(filteredLinks);
  }, [query]);

  useEffect(() => {
    getAndSetSharedLinks();
  }, []);

  async function fetchUserLinksFromServer() {
    try {
      const response = await axiosInstance.get(USER_URL, {
        headers: {
          auth: auth?.token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserLinksFromServer();
  }, []);

  return (
    <div className="panel-light w-full h-full overflow-hidden flex flex-col gap-1">
      <PageTitle person={person} />
      {!linksToDisplay ? (
        <NotFound title="Links" size="text-2xl" />
      ) : (
        <div className="panel-light flex flex-col  flex-grow  gap-2 overflow-hidden px-2 pb-2">
          {/* Controllers */}
          <Controls
            setDisplayStyle={setDisplayStyle}
            handleType={handleType}
            query={query}
            setQuery={setQuery}
            activeType={activeType}
            setActiveType={setActiveType}
          />

          {/* <div className="flex flex-wrap gap-1 justify-center p-2">
          {linksToDisplay.map((sharedLink, index) => (
            <SharedLinkCard
              key={index}
              // width="w-1/3"
              variant={displayStyle}
              size="medium"
              sharedLink={sharedLink}
              />
          ))}
        </div> */}
          <GrabScroll
            sharedLinks={linksToDisplay}
            Component={displayStyle === "grid" ? CardSharedMd : CardSharedLg}
            width={320}
          />
        </div>
      )}
    </div>
  );
}

function regenerateUser({ userId }: { userId: string }): PersonType {
  const person = getPersonById(parseInt(userId));
  const regeneratedPerson: PersonType = {
    ...person,
    firstName: person?.firstName || "NA",
    lastName: person?.lastName || "NA",
    photo: person?.photo || "/images/defaults/personDefaultImage.png",
    id: person?.id || 0,
    title: person?.title || "NA",
    rankCount: person?.rankCount || 0,
    sharesCount: person?.sharesCount || 0,
    subscribersCount: person?.subscribersCount || 0,
    followers: person?.followers || 0,
    publications: person?.publications || {
      links: [],
      categories: [],
    },
  };
  return regeneratedPerson;
}
