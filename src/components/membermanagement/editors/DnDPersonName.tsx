import { useDrag } from "react-dnd";
import { PersonType } from "../../../lib/interfaces";
import ProfilePicture from "../../profilePictures/ProfilePicture";

export default function DndPerson({ person }: { person: PersonType }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "PERSON",
    item: { person },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const personFullName = person.firstName + " " + person.lastName;

  return (
    <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div
        role="Handle"
        ref={drag}
        className="flex items-center gap-2 text-xs uppercase"
      >
        <ProfilePicture person={person} />
        <h2>{personFullName}</h2>
      </div>
    </div>
  );
}
