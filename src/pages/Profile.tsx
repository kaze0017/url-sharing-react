import { getPersonById } from "../lib/actions";
import { Person } from "../lib/interfaces";
import { getSharedLinks } from "../lib/actions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GrabScroll from "../components/GrabScroll";
import CardSharedMd from "../components/cards/CardSharedMd";
import CardSharedLg from "../components/cards/CardSharedLg";
import PageTitle from "../components/profile/PageTitle";
// import ControlBtn from "../components/profile/ControlBtn";
import Controls from "../components/profile/Controls";

export default function Profile() {
  const params = useParams();
  const { userId } = params as { userId: string };

  //  const userIdString = stringify(userId);
  const person = regenerateUser({ userId });
  const rankShareClass = "flex flex-col items-center ";
  const iconTextClass =
    "text-xs text-gray-500 flex items-center justify-center gap-1 border-t-2 border-indigo-500";
  const subscribeWrapperClass = "flex flex-col items-center";

  const sharedLinks = getSharedLinks();
  const [linksToDisplay, setLinksToDisplay] = useState(sharedLinks);
  const [displayStyle, setDisplayStyle] = useState<"grid" | "list">("grid");
  const [activeType, setActiveType] = useState("all");
  const [query, setQuery] = useState<string>("");


  function handleType(type: string) {
    if (type === "all") {
      setLinksToDisplay(sharedLinks);
      return;
    }
    const filteredLinks = sharedLinks.filter((sharedLink) =>
      sharedLink.type.includes(type)
    );
    setLinksToDisplay(filteredLinks);
  }

  // const ref =
  //   useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  // const { events } = useDraggable(ref);

  useEffect(() => {
    if (query === "") {
      setLinksToDisplay(sharedLinks);
      return;
    }
    const filteredLinks = sharedLinks.filter((sharedLink) =>
      sharedLink.title.toLowerCase().includes(query.toLowerCase())
    );
    setLinksToDisplay(filteredLinks);
  }, [query]);

  return (
    <div className="flex flex-col gap-2 flex-grow">
      <PageTitle person={person} />
      <div className="panel-light w-full flex-grow p-2 overflow-hidden">
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
    </div>
  );
}

function regenerateUser({ userId }: { userId: string }): Person {
  const person = getPersonById(parseInt(userId));
  const regeneratedPerson: Person = {
    ...person,
    name: person?.name || "NA",
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
