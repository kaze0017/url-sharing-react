import { useEffect } from "react";
import { useParams } from "react-router-dom";
import GrabScroll from "../components/GrabScroll";
import CardSharedMd from "../components/cards/CardSharedMd";
import CardSharedLg from "../components/cards/CardSharedLg";
import PageTitle from "../components/profile/PageTitle";
import NotFound from "../components/NotFound";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { getUserInfo, setQuery, setView } from "../state/profile/profileSlice";
import Actions from "../components/controllers/Actions";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";

export default function Profile() {
  const params = useParams();
  const { userId } = params as { userId: string };
  const { userInfo, linksToDisplay, view, query } = useSelector(
    (state: RootState) => state.profile
  );
  const dispatch = useDispatch<AppDispatch>();

  function handleSetQuery(newQuery: string) {
    dispatch(setQuery(newQuery));
  }
  function handleSetView() {
    dispatch(setView());
  }

  useEffect(() => {
    async function loadUserInfo() {
      await dispatch(getUserInfo(userId));
      console.log("User Info Loaded", userInfo);
    }
    loadUserInfo();
  }, [userId]);

  return userInfo ? (
    <div className="panel-light w-full h-full overflow-hidden flex flex-col gap-1">
      <PageTitle person={userInfo} />
      {!linksToDisplay || linksToDisplay.length === 0 ? (
        <div className="items-center justify-center flex flex-col flex-grow gap-2 overflow-hidden px-2 pb-2">
          <Paper className="flex items-center justify-center p-4" elevation={3}>
            <Alert severity="info">
              This user has not published any links yet.
            </Alert>
          </Paper>
        </div>
      ) : (
        <div className="panel-light flex flex-col flex-grow gap-2 overflow-hidden px-2 pb-2">
          <Actions
            query={query}
            setQuery={handleSetQuery}
            view={view}
            setView={handleSetView}
          />

          <GrabScroll
            sharedLinks={linksToDisplay}
            Component={view === "grid" ? CardSharedMd : CardSharedLg}
            width={320}
          />
        </div>
      )}
    </div>
  ) : (
    <NotFound title="User" size="text-2xl" />
  );
}
