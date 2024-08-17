import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotifications } from "../../api/gets/getNotifications";

interface TopPanelState {
  pageTitle: string;
  state: "notification" | "search" | "settings" | "history";
  notifications: any;
}

const initialState: TopPanelState = {
  pageTitle: "Search",
  state: "search",
  notifications: [],
};

const topPanelSlice = createSlice({
  name: "toppanel",
  initialState,
  reducers: {
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload;
    },
    setState: (
      state,
      action: PayloadAction<"notification" | "search" | "settings" | "history">
    ) => {
      state.state = action.payload;
    },
  },
});

export const { setPageTitle, setState } = topPanelSlice.actions;
export default topPanelSlice.reducer;

