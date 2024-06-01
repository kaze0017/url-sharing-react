import React, { useEffect, useContext, useState } from "react";
import CardSharedLg from "../../../cards/CardSharedLg";
import CardSharedMd from "../../../cards/CardSharedMd";
// import { getSharedLinks } from "../../../../lib/actions";
import Search from "./shared/Search";
import Sort from "./shared/Sort";
import GrabScroll from "../../../GrabScroll";
import AuthContext from "../../../../context/AuthProvider";
import { getSharedLinks } from "../../../../api/axios";
import { SharedLinkType } from "../../../../lib/interfaces";
import SliderFlexWrapper from "../../../sliders/SliderFlexWrapper";
import NotFound from "../../../NotFound";
import Pagination from "../../../sliders/Pagination";

export default function Shared() {
  const [sharedLinks, setSharedLinks] = useState<SharedLinkType[] | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("saved");
  const [sharedLinksToDisplay, setSharedLinksToDisplay] = useState<
    SharedLinkType[]
  >([]);

  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Filter the shared links based on the query
    if (!sharedLinksToDisplay || !sharedLinks) {
      return;
    }

    const filteredLinks = sharedLinksToDisplay.filter((sharedLink) =>
      sharedLink.title.toLowerCase().includes(query.toLowerCase())
    );
    if (query === "") {
      setSharedLinksToDisplay(sharedLinks);
    } else setSharedLinksToDisplay(filteredLinks);
  }, [query]);

  useEffect(() => {
    // Sort the shared links based on the query
    const sortedLinks = [...sharedLinksToDisplay].sort((a, b) => {
      if (sort === "saved") {
        return b.savedCount - a.savedCount;
      } else if (sort === "shared") {
        return b.sharedCount - a.sharedCount;
      } else {
        return b.rankCount - a.rankCount;
      }
    });
    setSharedLinksToDisplay(sortedLinks);
  }, [sort]);

  async function getAndSetSharedLinks() {
    const sharedLinks = await getSharedLinks(token);
    console.log("dfdsfdssgd", sharedLinks);

    setSharedLinks(sharedLinks);
    setSharedLinksToDisplay(sharedLinks);
  }

  useEffect(() => {
    getAndSetSharedLinks();
  }, []);

  return sharedLinks === null ? (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src="/images/assets/loading.svg"
        alt="loading"
        width="200px"
        className="mx-auto"
      />
    </div>
  ) : sharedLinks?.length > 0 ? (
    <div className="w-full h-full overflow-hidden flex flex-col gap-2 p-2">
      <Search query={query} setQuery={setQuery} />
      <Sort setSort={setSort} />
      <SliderFlexWrapper
        sharedLinks={sharedLinksToDisplay}
        CardComponent={CardSharedLg}
        setIsLoading={setIsLoading}
      />
      {/* <Pagination sharedLinks={sharedLinksToDisplay} /> */}
    </div>
  ) : (
    <NotFound title="shared links" size="text-md" />
  );
}
