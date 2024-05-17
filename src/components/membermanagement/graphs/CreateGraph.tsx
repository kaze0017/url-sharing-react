
import SearchPeople from "../SearchPeople";
import RawTree from "../editors/RawTree";

export default function EditGraph() {
  return (
      <div className="overflow-hidden flex flex-grow w-full p-2 gap-2">
        <SearchPeople />
        <RawTree />
      </div>
  );
}
