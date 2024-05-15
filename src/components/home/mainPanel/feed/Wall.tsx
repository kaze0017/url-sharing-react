import React, { useEffect, useState, useContext } from "react";
import { getSharedLinks } from "../../../../api/axios";
import CardImgIconS from "../../../cards/CardImgIconS";
import SliderFlexWrapper from "../../../sliders/SliderFlexWrapper";
import { SharedLinkType } from "../../../../lib/interfaces";
import Controls from "./wall/Controls";
import AuthContext from "../../../../context/AuthProvider";
import NotFound from "../../../NotFound";

export default function Wall() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const [isLoading, setIsLoading] = useState(true);
  const [sharedLinks, setSharedLinks] = useState<SharedLinkType[] | null>(null);
  const [query, setQuery] = React.useState("");

  async function getAndSetSharedLinks() {
    const sharedLinks = await getSharedLinks(token);

    setSharedLinks(sharedLinks);
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
    setSharedLinks(filteredLinks);
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
      <Controls query={query} setQuery={setQuery} />
      <SliderFlexWrapper
        sharedLinks={sharedLinks}
        CardComponent={CardImgIconS}
        setIsLoading={setIsLoading}
      />
    </div>
  ) : (
    <NotFound title="shared links" size="text-md" />
  );
}
