import { useEffect, useState, useContext } from "react";
import { RightPanelContext } from "../../../context/RightPanelProvider";
import AuthContext from "../../../context/AuthProvider";
import SearchBar from "../../SearchBar";
import { getNPeople } from "../../../lib/actions";
import { BsArrowsExpandVertical } from "react-icons/bs";
import Person from "./search/Person";
import Link from "./search/Link";
import Controller from "./search/Controller";
import { getSharedLinks } from "../../../api/getSharedLinks";
import { SharedLinkType } from "../../../lib/interfaces";
import { getTopUsers } from "../../../api/getTopUsers";

export default function Searches() {
  const { toggleRightPanel, setToggleRightPanel } =
    useContext(RightPanelContext);
  const [query, setQuery] = useState<string>("");
  const people = getNPeople(10);
  const [peopleToDisplay, setPeopleToDisplay] = useState<any[]>([]);
  const [linksToDisplay, setLinksToDisplay] = useState<any[]>([]);
  const [links, setLinks] = useState<SharedLinkType[]>([]);
  const [mode, setMode] = useState<
    "all" | "people" | "tags" | "categories" | "links"
  >("all");

  const { auth } = useContext(AuthContext);
  async function getLinks() {
    const token = auth?.token;
    const date = await getSharedLinks(token || "");
    setLinks(date);
  }
  async function getPeople() {
    getTopUsers(auth?.token || "");
  }

  useEffect(() => {
    getLinks();
    getPeople();
  }, []);

  useEffect(() => {
    setPeopleToDisplay(
      people.filter(
        (person) =>
          person.first_name.toLowerCase().includes(query.toLowerCase()) ||
          person.last_name.toLowerCase().includes(query.toLowerCase())
      )
    );
    setLinksToDisplay(
      links.filter((link) =>
        link.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, mode]);

  return (
    <div className="flex flex-col gap-2 p-1 h-full">
      {toggleRightPanel ? (
        <BsArrowsExpandVertical
          className="text-2xl text-blue-950 cursor-pointer"
          onClick={() => setToggleRightPanel(false)}
        />
      ) : (
        <>
          <Controller mode={mode} setMode={setMode} />
          <SearchBar query={query} setQuery={setQuery} />

          <div className="uppercase text-xs font-semibold flex flex-col gap-1 overflow-y-auto h-full">
            {(mode === "people" || mode === "all") &&
              peopleToDisplay
                .slice(0, 5)
                .map((person, index) => <Person key={index} person={person} />)}
            {(mode === "links" || mode === "all") &&
              linksToDisplay
                .slice(0, 5)
                .map((link, index) => <Link key={index} link={link} />)}
          </div>
        </>
      )}
    </div>
  );
}
