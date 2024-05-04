import { useDrag } from "react-dnd";
import { Person } from "../../../lib/interfaces";
import ProfilePicture from "../../ProfilePicture";

export default function DndPerson({ person }: { person: Person }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "PERSON",
    item: { person },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div role="Handle" ref={drag} className="flex items-center gap-2 text-xs uppercase">
        <ProfilePicture imageUrl={person.photo} alt={person.name} />
        <h2>{person.name}</h2>
      </div>
    </div>
  );
}
