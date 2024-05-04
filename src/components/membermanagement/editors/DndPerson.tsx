import { useDrag } from "react-dnd";
import { Person } from "../../../lib/interfaces";
import ProfilePictureLg from "../../ProfilePictureLg";

export default function DndPerson({ person }: { person: Person }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "PERSON",
    item: { person },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragPreview}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="flex items-center gap-2 text-xs uppercase h-9"
    >
      <div role="Handle" ref={drag}>
        <ProfilePictureLg imageUrl={person.photo} alt={person.name} />
      </div>
    </div>
  );
}
