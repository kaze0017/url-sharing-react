import { useDrag } from "react-dnd";
import { UserProfileType } from "../../../lib/interfaces";
import ProfilePicture from "../../profilePictures/ProfilePicture";

export default function DndPerson({ person }: { person: UserProfileType }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "PERSON",
    item: { person },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const personFullName = person.first_name + " " + person.last_name;

  return (
    <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div
        role="Handle"
        ref={drag}
        className="flex items-center gap-2 text-xs uppercase"
      >
        <ProfilePicture user={person} size="small" clickable={false} />
        <h2>{personFullName}</h2>
      </div>
    </div>
  );
}
