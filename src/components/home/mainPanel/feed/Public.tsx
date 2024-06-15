import React, { useEffect, useContext, useState } from "react";
import { HomeContext } from "../../../../context/HomeProvider";
import CardSharedLg from "../../../cards/CardSharedLg";
import CardSharedMd from "../../../cards/CardSharedMd";
import CardSharedSm from "../../../cards/CardSharedSm";

import AuthContext from "../../../../context/AuthProvider";
import { getPublicLinks } from "../../../../api/getPublicLinks";
import { getUserLinks } from "../../../../api/userLinks";
import { SharedLinkType } from "../../../../lib/interfaces";
import SliderFlexWrapper from "../../../sliders/SliderFlexWrapper";
import NotFound from "../../../NotFound";
import Pagination from "../../../sliders/Pagination";

export default function Shared() {
  const [sharedLinks, setSharedLinks] = useState<SharedLinkType[] | null>(null);
  const { query, view, sortBy } = useContext(HomeContext);
  const [linksToDisplay, setLinksToDisplay] = useState<SharedLinkType[]>([]);

  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Filter the shared links based on the query
    if (!sharedLinks) {
      return;
    }

    const filteredLinks = sharedLinks.filter((sharedLink) =>
      sharedLink.title.toLowerCase().includes(query.toLowerCase())
    );
    setLinksToDisplay(filteredLinks);
  }, [query]);

  useEffect(() => {
    // Sort the shared links based on the query
    const sortedLinks = [...linksToDisplay].sort((a, b) => {
      if (sortBy === "saved") {
        return b.savedCount - a.savedCount;
      } else if (sortBy === "shared") {
        return b.sharedCount - a.sharedCount;
      } else {
        return b.rankCount - a.rankCount;
      }
    });
    setLinksToDisplay(sortedLinks);
  }, [sortBy]);

  async function getAndSetSharedLinks() {
    const sharedLinks = await getPublicLinks(token);

    await getUserLinks(token);
    setSharedLinks(sharedLinks);
    setLinksToDisplay(sharedLinks);
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
      {view === "grid" ? (
        <SliderFlexWrapper
          sharedLinks={linksToDisplay}
          CardComponent={CardSharedMd}
          setIsLoading={setIsLoading}
          multi={true}
        />
      ) : view === "cardImgIconS" ? (
        <SliderFlexWrapper
          sharedLinks={linksToDisplay}
          CardComponent={CardSharedSm}
          setIsLoading={setIsLoading}
        />
      ) : (
        <SliderFlexWrapper
          sharedLinks={linksToDisplay}
          CardComponent={CardSharedLg}
          setIsLoading={setIsLoading}
        />
      )}

      {/* <Pagination sharedLinks={sharedLinksToDisplay} /> */}
    </div>
  ) : (
    <NotFound title="shared links" size="text-md" />
  );
}
