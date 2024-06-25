import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RelationsState {
  view: "small" | "medium" | "table";
  showFilter: boolean;
}

const initialState: RelationsState = {
  view: "small",
  showFilter: false,
};

const relationsSlice = createSlice({
  name: "relations",
  initialState,
  reducers: {
    setView: (state) => {
        switch (state.view) {
            case "small":
                state.view = "medium";
                break;
            case "medium":
                state.view = "table";
                break;
            case "table":
                state.view = "small";
                break;
            }
    },
    setShowFilter: (state, action: PayloadAction<boolean>) => {
      state.showFilter = action.payload;
    },
  },
});

export const { setView, setShowFilter } = relationsSlice.actions;
export default relationsSlice.reducer;
