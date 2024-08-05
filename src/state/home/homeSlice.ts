import { createSlice } from "@reduxjs/toolkit";
import { SharedLinkType } from "../../lib/interfaces";
import { set } from "react-hook-form";
interface HomeState {
  mode: "saved" | "public" | "trend";
  query: string;
  sortBy: "rank" | "shared" | "saved";
  view: "cardImgIconS" | "cardSharedLg" | "grid";
  toggledTopPanel: boolean;
  links: SharedLinkType[];
  linksToDisplay: SharedLinkType[];
}

const initialState: HomeState = {
  mode: "saved",
  query: "",
  sortBy: "rank",
  view: "cardImgIconS",
  toggledTopPanel: false,
  links: [],
  linksToDisplay: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
      state.linksToDisplay = filterLinks(state.links, action.payload);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.linksToDisplay = sortLinks(state.linksToDisplay, action.payload);
    },
    setView: (state) => {
      switch (state.view) {
        case "cardImgIconS":
          state.view = "cardSharedLg";
          break;
        case "cardSharedLg":
          state.view = "grid";
          break;
        case "grid":
          state.view = "cardImgIconS";
          break;
      }
    },
    setLinks: (state, action) => {
      state.links = action.payload;
      state.linksToDisplay = sortLinks(state.links, state.sortBy);
      state.linksToDisplay = filterLinks(state.links, state.query);
    },
    setToggledTopPanel: (state) => {
      state.toggledTopPanel = !state.toggledTopPanel;
    },
  },
});

export const { setMode, setQuery, setSortBy, setView, setToggledTopPanel, setLinks } =
  homeSlice.actions;

export default homeSlice.reducer;

function sortLinks(
  links: SharedLinkType[],
  sortBy: "rank" | "shared" | "saved"
) {
  return [...links].sort((a, b) => {
    if (sortBy === "saved") {
      return b.savedCount - a.savedCount;
    } else if (sortBy === "shared") {
      return b.sharedCount - a.sharedCount;
    } else {
      return b.rankCount - a.rankCount;
    }
  });
}

function filterLinks(links: SharedLinkType[], query: string) {
  return links.filter((sharedLink) =>
    sharedLink.title.toLowerCase().includes(query.toLowerCase())
  );
}
