import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../state/store";
import {
  setExpirationDate,
  setPublicationDate,
} from "../../../state/share/shareSlice";

export default function Dates() {
  const { publicationDate, expirationDate } = useSelector(
    (state: RootState) => state.share
  );
  const dispatch = useDispatch();
  const mainWrapperClass =
    "flex flex-col gap-1 uppercase text-xs uppercase font-semibold text-bas";
  const inputWrapperClass = "flex  items-center justify-between gap-1";
  return (
    <div className={mainWrapperClass}>
      <div className={inputWrapperClass}>
        <label htmlFor="publicationDate">Publication Date</label>
        <input
          type="date"
          id="publicationDate"
          value={publicationDate}
          onChange={(e) => dispatch(setPublicationDate(e.target.value))}
        />
      </div>

      <div className={inputWrapperClass}>
        <label htmlFor="expirationDate">Expiration Date</label>

        <input
          type="date"
          id="expirationDate"
          value={expirationDate}
          onChange={(e) => dispatch(setExpirationDate(e.target.value))}
        />
      </div>
    </div>
  );
}
