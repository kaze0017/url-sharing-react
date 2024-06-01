import  { useContext } from "react";
import { RelationsContext } from "../../context/RelationsProvider";
import Controller from "./relations/Controller";
import { getNPeople } from "../../lib/actions";
import CardSm from "./relations/CardSm";
import CardMd from "./relations/CardMd";
import Table from "./relations/Table";


export default function Relations() {
  const { view } = useContext(RelationsContext);
  const people = getNPeople(5);
  return (
    <div className="flex flex-col gap-2 p-2">
      <Controller />
      <div className="flex flex-wrap gap-2 w-full p-6  overflow-y-auto justify-center">
        {view === "small" &&
          people.map((person) => <CardSm key={person.id} {...person} />)}
        {view === "medium" &&
          people.map((person) => <CardMd key={person.id} {...person} />)}
        {view === "table" && <Table people={people} />}
      </div>
    </div>
  );
}
