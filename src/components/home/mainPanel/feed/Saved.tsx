import React, { useEffect, useState, useContext } from "react";
import { HomeContext } from "../../../../context/HomeProvider";
import { getSharedLinks } from "../../../../api/getSharedLinks";
import CardSharedMd from "../../../cards/CardSharedMd";
import CardImgIconS from "../../../cards/CardImgIconS";
import CardSharedLg from "../../../cards/CardSharedLg";
import SliderFlexWrapper from "../../../sliders/SliderFlexWrapper";
import { SharedLinkType } from "../../../../lib/interfaces";
import Controllers from "./Controllers";
import AuthContext from "../../../../context/AuthProvider";
import NotFound from "../../../NotFound";

export default function Wall() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const [isLoading, setIsLoading] = useState(true);
  const [sharedLinks, setSharedLinks] = useState<SharedLinkType[] | null>(null);
  const [linksToDisplay, setLinksToDisplay] = useState<SharedLinkType[]>([]);
  const { query, view } = useContext(HomeContext);

  async function getAndSetSharedLinks() {
    const sharedLinks = await getSharedLinks(token);
    setSharedLinks(sharedLinks);
    setLinksToDisplay(sharedLinks);
  }

  useEffect(() => {
    getAndSetSharedLinks();
  }, []);

  useEffect(() => {
    if (!sharedLinks) {
      return;
    }
    // Filter the shared links based on the query

    const filteredLinks = sharedLinks.filter((sharedLink) =>
      sharedLink.title.toLowerCase().includes(query.toLowerCase())
    );
    setLinksToDisplay(filteredLinks);
  }, [query]);

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
          CardComponent={CardImgIconS}
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
  ) : (
    <NotFound title="shared links" size="text-md" />
  );
}
