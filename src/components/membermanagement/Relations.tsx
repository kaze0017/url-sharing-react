import React, { useContext } from "react";
import { RelationsContext } from "../../context/RelationsProvider";
import Controller from "./relations/Controller";
import MainPanelWrapper from "../MainPanelWrapper";
import { getNPeople } from "../../lib/actions";
import CardSm from "./relations/CardSm";
import CardMd from "./relations/CardMd";
import Table from "./relations/Table";

export default function Relations() {
  const { view } = useContext(RelationsContext);
  const people = getNPeople(5);
  return (
    <MainPanelWrapper>
      <Controller />
      <div className="flex flex-wrap gap-2 w-full p-2 max-h-[100%] overflow-y-auto justify-center">
        {view === "small" &&
          people.map((person) => <CardSm key={person.id} {...person} />)}
        {view === "medium" &&
          people.map((person) => <CardMd key={person.id} {...person} />)}
        {view === "table" && <Table people={people} />}
      </div>
    </MainPanelWrapper>
  );
}
