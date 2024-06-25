import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NetworkState {
  type: "groups" | "graphs" | "relations" | "none";
  view: "grid" | "list";
}

const initialState: NetworkState = {
  type: "none",
  view: "grid",
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setType: (
      state,
      action: PayloadAction<"groups" | "graphs" | "relations" | "none">
    ) => {
      state.type = action.payload;
    },
    setView: (state, action: PayloadAction<"grid" | "list">) => {
      state.view = action.payload;
    },
  },
});

export const { setType, setView } = networkSlice.actions;
export default networkSlice.reducer;
