import { useContext } from "react";
import ShareWithGroupsContext from "../../../context/ShareWithGroupsProvider";
import { PersonType } from "../../../lib/interfaces";
import ProfilePicture from "../../profilePictures/ProfilePicture";

interface CardPersonProps {
  person: PersonType;
  selected: boolean;
}

export default function CardPerson({ person, selected }: CardPersonProps) {
  const { selectedPeople, setSelectedPeople, setPeopleToDisplay } = useContext(
    ShareWithGroupsContext
  );

  function toggle(person: PersonType) {
    if (selectedPeople.some((item) => item.id === person.id)) {
      setSelectedPeople((prevSelectedPeople) =>
        prevSelectedPeople.filter((prevPerson) => prevPerson.id !== person.id)
      );

      setPeopleToDisplay((prevPeopleToDisplay) => [
        ...prevPeopleToDisplay,
        person,
      ]);
    } else {
      setSelectedPeople((prevSelectedPeople) => [
        ...prevSelectedPeople,
        person,
      ]);
      setPeopleToDisplay((prevPeopleToDisplay) =>
        prevPeopleToDisplay.filter((prevPerson) => prevPerson.id !== person.id)
      );
    }
  }

  const cardClass = `text-xs w-[80px] h-[100px] flex flex-col items-center justify-center gap-1 p-1 rounded-lg cursor-pointer ${
    selected ? "bg-indigo-200" : "bg-gray-200"
  }`;

  return (
    <div
      onClick={() => {
        toggle(person);
      }}
      className={cardClass}
    >
      <ProfilePicture person={person} />
      <p>{person.first_name}</p>
      <p>{person.last_name}</p>
    </div>
  );
}
