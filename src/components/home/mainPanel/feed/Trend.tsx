import { useEffect, useState } from "react";
import CardSharedMd from "../../../cards/CardSharedMd";
import CardSharedLg from "../../../cards/CardSharedLg";
import CardImgIconS from "../../../cards/CardImgIconS";
import { SharedLinkType } from "../../../../lib/interfaces";
import SliderFlexWrapper from "../../../sliders/SliderFlexWrapper";
import NotFound from "../../../NotFound";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../state/store";
import { loadPopularLinks } from "../../../../state/home/topContentsSlice";
import LoadingBackdrop from "../../LoadingBackdrop";

export default function Trend() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { linksToDisplay, view } = useSelector(
    (state: RootState) => state.home
  );
  const { loadingPopularLinks } = useSelector(
    (state: RootState) => state.hotContents
  );
  useEffect(() => {
    async function loadPopular() {
      await dispatch(loadPopularLinks());
    }
    loadPopular();
  }, []);

  if (loadingPopularLinks) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingBackdrop />
      </div>
    );
  }

  if (linksToDisplay === null || linksToDisplay.length === 0) {
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
