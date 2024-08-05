import { useEffect, useContext, useState } from "react";
import CardSharedLg from "../../../cards/CardSharedLg";
import CardSharedMd from "../../../cards/CardSharedMd";
import CardSharedSm from "../../../cards/CardSharedSm";

import { SharedLinkType } from "../../../../lib/interfaces";
import SliderFlexWrapper from "../../../sliders/SliderFlexWrapper";
import NotFound from "../../../NotFound";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../state/store";
import { loadPublicLinks } from "../../../../state/home/topContentsSlice";
import LoadingBackdrop from "../../LoadingBackdrop";
import { setLinks } from "../../../../state/home/homeSlice";

export default function Shared() {
  const { view, linksToDisplay } = useSelector((state: RootState) => state.home);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { publicLinks, loadingPublicLinks } = useSelector(
    (state: RootState) => state.hotContents
  );

  useEffect(() => {
    async function loadPublics() {
      await dispatch(loadPublicLinks());
    }
    loadPublics();
    setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   if (sharedLinks) {
  //     const filteredLinks = sharedLinks.filter((sharedLink) =>
  //       sharedLink.title.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setLinksToDisplay(filteredLinks);
  //   }
  // }, [query, sharedLinks]);

  // useEffect(() => {
  //   if (linksToDisplay.length > 0) {
  //     const sortedLinks = [...linksToDisplay].sort((a, b) => {
  //       if (sortBy === "saved") {
  //         return b.savedCount - a.savedCount;
  //       } else if (sortBy === "shared") {
  //         return b.sharedCount - a.sharedCount;
  //       } else {
  //         return b.rankCount - a.rankCount;
  //       }
  //     });
  //     setLinksToDisplay(sortedLinks);
  //   }
  // }, [sortBy]);

  return (
    <div className="w-full h-full overflow-hidden flex flex-col gap-2 p-2">
      {loadingPublicLinks ? (
        <LoadingBackdrop />
      ) : linksToDisplay.length === 0 ? (
        <NotFound title="shared links" size="text-md" />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
