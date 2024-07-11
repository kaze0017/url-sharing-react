import { UserProfileType, SharedLinkType } from "../lib/interfaces";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import GrabScroll from "../components/GrabScroll";
import CardSharedMd from "../components/cards/CardSharedMd";
import CardSharedLg from "../components/cards/CardSharedLg";
import PageTitle from "../components/profile/PageTitle";
import Controls from "../components/profile/Controls";
import AuthContext from "../context/AuthProvider";
import { getUserInfoById } from "../api/gets/getUserInfoById";
import NotFound from "../components/NotFound";

export default function Profile() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";

  const params = useParams();
  const { userId } = params as { userId: string };
  const [person, setPerson] = useState<UserProfileType | null>(null);

  const [sharedLinks, setSharedLinks] = useState<SharedLinkType[] | null>(null);
  const [linksToDisplay, setLinksToDisplay] = useState<SharedLinkType[] | null>(
    null
  );
  const [displayStyle, setDisplayStyle] = useState<"grid" | "list">("grid");
  const [activeType, setActiveType] = useState("all");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    async function getPerson() {
      const response = await getUserInfoById({
        userId: userId,
        token: token,
      });
      setPerson(response.user_info);
      let tempLinks = response.public_links;

      if (!Array.isArray(tempLinks)) {
        tempLinks = [tempLinks];
      }

      setSharedLinks(tempLinks);
      setLinksToDisplay(tempLinks);
    }
    getPerson();
  }, [userId, token]);
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
  }, [query, sharedLinks]);

  return person ? (
    <div className="panel-light w-full h-full overflow-hidden flex flex-col gap-1">
      <PageTitle person={person} />
      {!linksToDisplay ? (
        <NotFound title="Links" size="text-2xl" />
      ) : (
        <div className="panel-light flex flex-col flex-grow gap-2 overflow-hidden px-2 pb-2">
          <Controls
            setDisplayStyle={setDisplayStyle}
            handleType={handleType}
            query={query}
            setQuery={setQuery}
            activeType={activeType}
            setActiveType={setActiveType}
          />

          <GrabScroll
            sharedLinks={linksToDisplay}
            Component={displayStyle === "grid" ? CardSharedMd : CardSharedLg}
            width={320}
          />
        </div>
      )}
    </div>
  ) : (
    <NotFound title="User" size="text-2xl" />
  );
}
