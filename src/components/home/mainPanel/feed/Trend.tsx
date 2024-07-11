import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import CardSharedMd from "../../../cards/CardSharedMd";
import CardSharedLg from "../../../cards/CardSharedLg";
import CardImgIconS from "../../../cards/CardImgIconS";
import { SharedLinkType } from "../../../../lib/interfaces";
import SliderFlexWrapper from "../../../sliders/SliderFlexWrapper";
import AuthContext from "../../../../context/AuthProvider";
import NotFound from "../../../NotFound";
import { getPopularLinks } from "../../../../api/gets/getPopularLinks";
import { RootState } from "../../../../state/store";

export default function Trend() {
  const { auth } = useContext(AuthContext);
  const view = useSelector((state: RootState) => state.home.view);
  const token = auth?.token || "";
  const [sharedLinks, setSharedLinks] = useState<SharedLinkType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAndSetSharedLinks() {
      const links = await getPopularLinks(token);
      setSharedLinks(links);
      setIsLoading(false);
    }
    getAndSetSharedLinks();
  }, [token]);

  useEffect(() => {
    if (sharedLinks !== null) {
      setIsLoading(false);
    }
  }, [sharedLinks]);

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
          sharedLinks={sharedLinks}
          CardComponent={CardSharedMd}
          setIsLoading={setIsLoading}
          multi={true}
        />
      )}
      {view === "cardImgIconS" && (
        <SliderFlexWrapper
          sharedLinks={sharedLinks}
          CardComponent={CardImgIconS}
          setIsLoading={setIsLoading}
        />
      )}
      {view !== "grid" && view !== "cardImgIconS" && (
        <SliderFlexWrapper
          sharedLinks={sharedLinks}
          CardComponent={CardSharedLg}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
}
