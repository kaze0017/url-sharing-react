import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotifications } from "../../api/gets/getNotifications";

interface TopPanelState {
  title: string;
  state: "notification" | "search" | "settings" | "history";
  notifications: any;
}

const initialState: TopPanelState = {
  title: "Search",
  state: "search",
  notifications: [],
};

const toppanelSlice = createSlice({
  name: "toppanel",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setState: (
      state,
      action: PayloadAction<"notification" | "search" | "settings" | "history">
    ) => {
      state.state = action.payload;
    },
  },
});

export const { setTitle, setState } = toppanelSlice.actions;

