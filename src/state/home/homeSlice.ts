import { createSlice } from "@reduxjs/toolkit";

interface HomeState {
  mode: "saved" | "public" | "trend";
  query: string;
  sortBy: "rank" | "shared" | "saved";
  view: "cardImgIconS" | "cardSharedLg" | "grid";
}

const initialState: HomeState = {
  mode: "saved",
  query: "",
  sortBy: "rank",
  view: "cardImgIconS",
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
  },
});

export const { setMode, setQuery, setSortBy, setView } = homeSlice.actions;

export default homeSlice.reducer;
