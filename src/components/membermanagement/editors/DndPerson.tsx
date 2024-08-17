import { useDrag } from "react-dnd";
import { UserProfileType } from "../../../lib/interfaces";
import ProfilePicture from "../../profilePictures/ProfilePicture";
import { useDispatch } from "react-redux";
import { setDraggingMember } from "../../../state/networks/groupsSlice";

export default function DndPerson({ person }: { person: UserProfileType }) {
  const dispatch = useDispatch();
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "PERSON",
    item: {
      person,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    // begin: () => {
    //   console.log("dragging ggg", person);
    //   dispatch(setDraggingMember(person));
    // },
  }));

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(person));
  };

  const personFullName = person.first_name + " " + person.last_name;
  return (
    <div
      ref={dragPreview}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="flex items-center gap-2 text-xs uppercase h-9"
      draggable={true}
      onDragStart={handleDragStart}
    >
      <div role="Handle" ref={drag}></div>
      <ProfilePicture user={person} size="medium" clickable={false}  hoverAnimation={false} />
    </div>
  );
}
