import { useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Controller from "./shareWithGroups/Controller";
import MainPanelWrapper from "../MainPanelWrapper";
import { groupOne, groupTwo, groupThree } from "../../lib/placeholder-data";
import SelectionPanel from "./shareWithGroups/SelectionPanel";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {
  initShareWithGroupsSlice,
  setGroupsToDisplay,
} from "../../state/share/shareSlice";
import { initializeGroupSlice } from "../../state/networks/groupsSlice";

export default function ShareWithGroups() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const { mode, selectedPeople, peopleToDisplay } = useSelector(
    (state: RootState) => state.share
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initShareWithGroupsSlice(token));
  }, []);

  const panelsWrapperClasses = "flex flex-col gap-2 w-full uppercase text-xs";
  const mainWrapperClass =
    "relative p-1 justify-center flex flex-wrap gap-x-2 gap-y-2 overflow-y-scroll min-w-full";

  return (
    <MainPanelWrapper>
      <div className="flex flex-col gap-2 w-full h-full items-center max-w-[600px] mx-auto overflow-hidden  overflow-y-hidden overflow-x-hidden">
        <Controller />
        <div className={mainWrapperClass}>
          {mode === "users" ? (
            <div className={panelsWrapperClasses}>
              <SelectionPanel title="Selected Users" name="selectedUsers" />
              <SelectionPanel title="Available Users" name="users" />
            </div>
          ) : mode === "groups" ? (
            <div className={panelsWrapperClasses}>
              <SelectionPanel title="Selected Groups" name="selectedGroups" />
              <SelectionPanel title="Available Groups" name="groups" />
            </div>
          ) : mode === "selected" ? (
            <div className={panelsWrapperClasses}>
              <SelectionPanel title="Selected Users" name="selectedUsers" />
              <SelectionPanel title="Selected Groups" name="selectedGroups" />
            </div>
          ) : null}
        </div>
      </div>
    </MainPanelWrapper>
  );
}
