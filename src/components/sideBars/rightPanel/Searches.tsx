import { useEffect, useState, useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import SearchBar from "../../SearchBar";
import { getNPeople } from "../../../lib/actions";
import { BsArrowsExpandVertical } from "react-icons/bs";
import Person from "./search/Person";
import Link from "./search/Link";
import Controller from "./search/Controller";
import { getSharedLinks } from "../../../api/gets/getSharedLinks";
import { SharedLinkType } from "../../../lib/interfaces";
import { getTopUsers } from "../../../api/gets/getTopUsers";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../state/store";
import { setToggleRightPanel } from "../../../state/rightPanel/rightPanelSlice";
import {
  searchPeople,
  setSearchPeopleQuery,
} from "../../../state/rightPanel/searchPeopleSlice";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Search from "../../home/mainPanel/feed/controllers/Search";
import Box from "@mui/material/Box";

export default function Searches() {
  const { toggleRightPanel } = useSelector(
    (state: RootState) => state.rightPanel
  );
  const { searchPeopleResults, searchPeopleQuery } = useSelector(
    (state: RootState) => state.searchPeople
  );
  const dispatch = useDispatch<AppDispatch>();

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
    dispatch(searchPeople());
  }, [searchPeopleQuery, mode]);

  return (
    <div className="flex flex-col gap-2 p-1 h-full">
      {toggleRightPanel ? (
        <BsArrowsExpandVertical
          className="text-2xl text-blue-950 cursor-pointer"
          onClick={() => dispatch(setToggleRightPanel(false))}
        />
      ) : (
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          height: "100%",
          overflowY: "auto",
        }}
      >
          <Controller mode={mode} setMode={setMode} />
          {/* <SearchBar
            query={searchPeopleQuery}
            setQuery={dispatch(setSearchPeopleQuery)}
          /> */}
         
          <div className="flex w-60">
            <Search
              query={searchPeopleQuery}
              setQuery={(value) => dispatch(setSearchPeopleQuery(value))}
            />
          </div>

          <div className="uppercase text-xs font-semibold flex flex-col gap-1 overflow-y-auto h-full">
            {(mode === "people" || mode === "all") &&
              searchPeopleResults
                .slice(0, 5)
                .map((person, index) => <Person key={index} person={person} />)}
            {(mode === "links" || mode === "all") &&
              linksToDisplay
                .slice(0, 5)
                .map((link, index) => <Link key={index} link={link} />)}
          </div>
        </Box>
      )}
    </div>
  );
}
