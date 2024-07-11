import React, { useEffect, useContext, useState } from "react";
import CardSharedLg from "../../../cards/CardSharedLg";
import CardSharedMd from "../../../cards/CardSharedMd";
import CardSharedSm from "../../../cards/CardSharedSm";
import AuthContext from "../../../../context/AuthProvider";
import { getPublicLinks } from "../../../../api/gets/getPublicLinks";
import { getUserLinks } from "../../../../api/gets/getUserLinks";
import { SharedLinkType } from "../../../../lib/interfaces";
import SliderFlexWrapper from "../../../sliders/SliderFlexWrapper";
import NotFound from "../../../NotFound";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";

export default function Shared() {
  const [sharedLinks, setSharedLinks] = useState<SharedLinkType[] | null>(null);
  const [linksToDisplay, setLinksToDisplay] = useState<SharedLinkType[]>([]);
  const { query, view, sortBy } = useSelector((state: RootState) => state.home);
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAndSetSharedLinks() {
      const sharedLinks = await getPublicLinks(token);
      await getUserLinks(token);
      setSharedLinks(sharedLinks);
      setLinksToDisplay(sharedLinks);
      setIsLoading(false); // Set loading to false after fetching data
    }
    getAndSetSharedLinks();
  }, [token]);

  useEffect(() => {
    if (sharedLinks) {
      const filteredLinks = sharedLinks.filter((sharedLink) =>
        sharedLink.title.toLowerCase().includes(query.toLowerCase())
      );
      setLinksToDisplay(filteredLinks);
    }
  }, [query, sharedLinks]);

  useEffect(() => {
    if (linksToDisplay.length > 0) {
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
    }
  }, [sortBy]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img
          src="/images/assets/loading.svg"
          alt="loading"
          width="200px"
          className="mx-auto"
        />
      </div>
    );
  }

  if (!sharedLinks || sharedLinks.length === 0) {
    return <NotFound title="shared links" size="text-md" />;
  }

  return (
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
    </div>
  );
}
