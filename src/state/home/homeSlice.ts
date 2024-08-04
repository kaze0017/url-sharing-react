import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

interface HomeState {
  mode: "saved" | "public" | "trend";
  query: string;
  sortBy: "rank" | "shared" | "saved";
  view: "cardImgIconS" | "cardSharedLg" | "grid";
  toggledTopPanel: boolean;
}

const initialState: HomeState = {
  mode: "saved",
  query: "",
  sortBy: "rank",
  view: "cardImgIconS",
  toggledTopPanel: false,
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
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
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
    setToggledTopPanel: (state) => {
      state.toggledTopPanel = !state.toggledTopPanel;
    }
  },
});

export const { setMode, setQuery, setSortBy, setView, setToggledTopPanel } =
  homeSlice.actions;

export default homeSlice.reducer;
