// Define DraggableProps interface
interface DraggableProps {
  children: React.ReactNode;
  dragObject: Person;
  onDragEnd?: () => void;
}

// Define interface for block data
interface Person {
  id: number;
  name: string;
  photo: string;
}

// Draggable Component
export default function Draggable({ children, dragObject, onDragEnd }: DraggableProps) {
  const onDragStarting = (
    e: React.DragEvent<HTMLDivElement>,
    dragObject: Person
  ) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ dragObject }));
  };

  const onDragEnding = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onDragEnd) {
      onDragEnd();
    }
  };

  return (
    <div
      draggable={true}
      onDragStart={(e) => onDragStarting(e, dragObject)}
      onDragEnd={onDragEnding}
    >
      {children}
    </div>
  );
}
