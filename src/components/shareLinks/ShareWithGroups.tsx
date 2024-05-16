import { useContext, useEffect } from "react";
import ShareWithGroupsContext from "../../context/ShareWithGroupsProvider";
import Controller from "./shareWithGroups/Controller";
import MainPanelWrapper from "../MainPanelWrapper";
import { getNPeople } from "../../lib/actions";

import CardPerson from "./shareWithGroups/CardPerson";

export default function ShareWithGroups() {
  const { mode, setMode, selectedPeople, peopleToDisplay, setPeopleToDisplay } =
    useContext(ShareWithGroupsContext);

  const people = getNPeople(10);

  useEffect(() => {
    setPeopleToDisplay(people);
  }, []);

  useEffect(() => {}, [selectedPeople, peopleToDisplay]);

  return (
    <MainPanelWrapper>
      <Controller />
      {mode === "people" ? (
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap gap-4 mt-4">
            {selectedPeople.map((person) => (
              <CardPerson key={person.id} person={person} selected={true} />
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {peopleToDisplay.map((person) => (
              <CardPerson key={person.id} person={person} selected={false} />
            ))}
          </div>
        </div>
      ) : (
        <div>Groups</div>
      )}
    </MainPanelWrapper>
  );
}
