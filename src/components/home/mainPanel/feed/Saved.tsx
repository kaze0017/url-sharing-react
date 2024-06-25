import React, { useEffect, useState, useContext } from "react";
import { getSharedLinks } from "../../../../api/getSharedLinks";
import CardSharedMd from "../../../cards/CardSharedMd";
import CardImgIconS from "../../../cards/CardImgIconS";
import CardSharedLg from "../../../cards/CardSharedLg";
import SliderFlexWrapper from "../../../sliders/SliderFlexWrapper";
import { SharedLinkType } from "../../../../lib/interfaces";
import AuthContext from "../../../../context/AuthProvider";
import NotFound from "../../../NotFound";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { getQuickAccessLinks } from "../../../../api/getQuickAccessLinks";

export default function Wall() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const [isLoading, setIsLoading] = useState(true);
  const [sharedLinks, setSharedLinks] = useState<SharedLinkType[] | null>(null);
  const [linksToDisplay, setLinksToDisplay] = useState<SharedLinkType[]>([]);

  const { query, view } = useSelector((state: RootState) => state.home);

  
  useEffect(() => {
    async function getAndSetQuickAccessLinks() {
      const links = await getQuickAccessLinks({token});
      setSharedLinks(links);
      setLinksToDisplay(links);
      setIsLoading(false); // Set loading to false after fetching data
    }
    getAndSetQuickAccessLinks();
  }, [token]);

  useEffect(() => {
    if (sharedLinks !== null) {
      // Filter the shared links based on the query
      const filteredLinks = sharedLinks.filter((sharedLink) =>
        sharedLink.title.toLowerCase().includes(query.toLowerCase())
      );
      setLinksToDisplay(filteredLinks);
    }
  }, [query, sharedLinks]);

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

  if (sharedLinks === null || sharedLinks.length === 0) {
    return <NotFound title="shared links" size="text-md" />;
  }

  return (
    <div className="w-full h-full overflow-hidden flex flex-col gap-2 p-2">
      {view === "grid" && (
        <SliderFlexWrapper
          sharedLinks={linksToDisplay}
          CardComponent={CardSharedMd}
          setIsLoading={setIsLoading}
          multi={true}
        />
      )}
      {view === "cardImgIconS" && (
        <SliderFlexWrapper
          sharedLinks={linksToDisplay}
          CardComponent={CardImgIconS}
          setIsLoading={setIsLoading}
        />
      )}
      {view !== "grid" && view !== "cardImgIconS" && (
        <SliderFlexWrapper
          sharedLinks={linksToDisplay}
          CardComponent={CardSharedLg}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
}
