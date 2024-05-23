import { useContext } from "react";
import ShareWithGroupsContext from "../../../context/ShareWithGroupsProvider";

export default function Dates() {
  const {
    publicationDate,
    setPublicationDate,
    expirationDate,
    setExpirationDate,
  } = useContext(ShareWithGroupsContext);
  const mainWrapperClass = "flex flex-col gap-1 uppercase text-xs uppercase font-semibold text-bas";
  const inputWrapperClass =
    "flex  items-center justify-between gap-1";
  return (
    <div className={mainWrapperClass}>
      <div className={inputWrapperClass}>
        <label htmlFor="publicationDate">Publication Date</label>
        <input
          type="date"
          id="publicationDate"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
        />
      </div>

      <div className={inputWrapperClass}>
        <label htmlFor="expirationDate">Expiration Date</label>

        <input
          type="date"
          id="expirationDate"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
      </div>
    </div>
  );
}
