import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../state/store";
import { setDescription } from "../../../state/share/shareSlice";
export default function Description() {
  const { description } = useSelector((state: RootState) => state.share);
  const dispatch = useDispatch();
  return (
    <div>
      <textarea
        placeholder="Write a Description"
        className="min-w-[300px] h-32 p-2 border-2 border-blue-950 rounded-lg"
        value={description}
        onChange={(e) => dispatch(setDescription(e.target.value))}
      />
    </div>
  );
}
