import { updateLink } from "../../api/posts/postUpdateLink";

import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import SearchBar from "../SearchBar";
import { getNPeople } from "../../lib/actions";
import Person from "./shareOnInternet/Person";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export default function ShareOnInternet() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const { selectedLinkIds } = useSelector((state: RootState) => state.link);
  const [query, setQuery] = useState<string>("");
  const [peopleToDisplay, setPeopleToDisplay] = useState<any[]>([]);
  const people = getNPeople(10);
  useEffect(() => {
    // setPeopleToDisplay(people);
    console.log("sdfsdf");
    const formData = new URLSearchParams();

    async function updateLinks() {
      selectedLinkIds.forEach(async (id) => {
        formData.append("audience", "True");
        await updateLink({ token, id: id, formData });
      });
    }
    updateLinks();
  }, []);

  useEffect(() => {
    setPeopleToDisplay(
      people.filter(
        (person) =>
          person.first_name.toLowerCase().includes(query.toLowerCase()) ||
          person.last_name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);
  return (
    <div className="flex items-center flex-col flex-grow w-full border">
      It is Public Now
      {/* <div className="flex flex-col gap-2 w-[600px] m-x-auto">
        <SearchBar query={query} setQuery={setQuery} />
        <div className="uppercase text-xs font-semibold flex flex-col gap-1">
          {peopleToDisplay.map((person, index) => (
            <Person key={index} person={person} />
          ))}
        </div>
      </div> */}
    </div>
  );
}
