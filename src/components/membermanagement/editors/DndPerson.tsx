import { useDrag } from "react-dnd";
import { PersonType } from "../../../lib/interfaces";
import ProfilePictureLg from "../../profilePictures/ProfilePictureLg";

export default function DndPerson({ person }: { person: PersonType }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "PERSON",
    item: { person },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const personFullName = person.first_name + " " + person.last_name;
  return (
    <div
      ref={dragPreview}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="flex items-center gap-2 text-xs uppercase h-9"
    >
      <div role="Handle" ref={drag}>
        <ProfilePictureLg person={person} />
      </div>
    </div>
  );
}
