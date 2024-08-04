import React, { useEffect, useState, useContext } from "react";
import { getSharedLinks } from "../../../../api/gets/getSharedLinks";
import CardSharedMd from "../../../cards/CardSharedMd";
import CardImgIconS from "../../../cards/CardImgIconS";
import CardSharedLg from "../../../cards/CardSharedLg";
import SliderFlexWrapper from "../../../sliders/SliderFlexWrapper";
import { SharedLinkType } from "../../../../lib/interfaces";
import AuthContext from "../../../../context/AuthProvider";
import NotFound from "../../../NotFound";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../state/store";
import { getQuickAccessLinks } from "../../../../api/gets/getQuickAccessLinks";
import { loadQuickAccessLinks } from "../../../../state/home/topContentsSlice";
import LoadingBackdrop from "../../LoadingBackdrop";

export default function Wall() {
  const [sharedLinks, setSharedLinks] = useState<SharedLinkType[] | null>(null);
  const [linksToDisplay, setLinksToDisplay] = useState<SharedLinkType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { query, view } = useSelector((state: RootState) => state.home);

  const { quickAccessLinks, loadingQuickAccessLinks } = useSelector(
    (state: RootState) => state.hotContents
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function loadQuickAccess() {
      await dispatch(loadQuickAccessLinks());
      setSharedLinks(quickAccessLinks);
      setLinksToDisplay(quickAccessLinks);
    }
    loadQuickAccess();
  }, []);

  useEffect(() => {
    if (sharedLinks !== null) {
      // Filter the shared links based on the query
      const filteredLinks = sharedLinks.filter((sharedLink) =>
        sharedLink.title.toLowerCase().includes(query.toLowerCase())
      );
      setLinksToDisplay(filteredLinks);
    }
  }, [query, sharedLinks]);

 
  if (sharedLinks === null || sharedLinks.length === 0) {
    return <NotFound title="shared links" size="text-md" />;
  }

  return (
    <div className="w-full h-full overflow-hidden flex flex-col gap-2 p-2">
      {loadingQuickAccessLinks ? (
        <LoadingBackdrop/>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
