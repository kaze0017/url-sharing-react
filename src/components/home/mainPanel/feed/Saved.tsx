import { useEffect, useState } from "react";
import CardSharedMd from "../../../cards/CardSharedMd";
import CardImgIconS from "../../../cards/CardImgIconS";
import CardSharedLg from "../../../cards/CardSharedLg";
import SliderFlexWrapper from "../../../sliders/SliderFlexWrapper";
import NotFound from "../../../NotFound";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../state/store";
import { loadQuickAccessLinks } from "../../../../state/home/topContentsSlice";
import LoadingBackdrop from "../../LoadingBackdrop";
import { Alert, Paper } from "@mui/material";

export default function Wall() {
  const [isLoading, setIsLoading] = useState(true);

  const { view, linksToDisplay } = useSelector(
    (state: RootState) => state.home
  );

  const { loadingQuickAccessLinks } = useSelector(
    (state: RootState) => state.hotContents
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function loadQuickAccess() {
      await dispatch(loadQuickAccessLinks());
    }
    loadQuickAccess();
  }, []);

  return (
    <div className="w-full h-full overflow-hidden flex flex-col gap-2 p-2">
      {loadingQuickAccessLinks ? (
        <LoadingBackdrop />
      ) : linksToDisplay === null || linksToDisplay.length === 0 ? (
        <div className="flex flex-grow  w-full items-center justify-center">
          <Paper className="flex items-center justify-center p-4" elevation={3}>
            <Alert severity="info">
              You have not saved any links yet. Start saving links to see them
              here.
            </Alert>
          </Paper>
        </div>
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
