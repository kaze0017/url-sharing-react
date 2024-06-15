import { useContext, useEffect } from "react";
import ShareWithGroupsContext from "../../context/ShareWithGroupsProvider";
import Controller from "./shareWithGroups/Controller";
import MainPanelWrapper from "../MainPanelWrapper";
import { getNPeople } from "../../lib/actions";
import { groupOne, groupTwo, groupThree } from "../../lib/placeholder-data";
import SelectionPanel from "./shareWithGroups/SelectionPanel";

export default function ShareWithGroups() {
  const {
    mode,
    selectedPeople,
    peopleToDisplay,
    setPeopleToDisplay,
    setGroupsToDisplay,
  } = useContext(ShareWithGroupsContext);

  const groups = [groupOne, groupTwo, groupThree];
  const people = getNPeople(10);

  useEffect(() => {
    // setPeopleToDisplay(people);
    setGroupsToDisplay(groups);
  }, []);

  useEffect(() => {}, [selectedPeople, peopleToDisplay]);
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
