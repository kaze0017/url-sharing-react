import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "../../lib/interfaces/NotificationType";

interface RightPanelState {
  toggleRightPanel: boolean;
  notifications: NotificationType;
  suggestionsCount: number;
  content: "history" | "suggestions" | "search" | "notifications";
}

const initialState: RightPanelState = {
  toggleRightPanel: false,
  notifications: {
    connection_request: [],
    shared: [],
  },
  suggestionsCount: 0,
  content: "notifications",
};

const rightPanelSlice = createSlice({
  name: "rightPanel",
  initialState,
  reducers: {
    setToggleRightPanel: (state, action: PayloadAction<boolean>) => {
      state.toggleRightPanel = action.payload;
    },
    setNotifications: (state, action: PayloadAction<NotificationType>) => {
      state.notifications = action.payload;
    },
    setSuggestionsCount: (state, action: PayloadAction<number>) => {
      state.suggestionsCount = action.payload;
    },
    setContent: (
      state,
      action: PayloadAction<
        "history" | "suggestions" | "search" | "notifications"
      >
    ) => {
      state.content = action.payload;
    },
  },
});

export const {
  setToggleRightPanel,
  setNotifications,
  setSuggestionsCount,
  setContent,
} = rightPanelSlice.actions;

export default rightPanelSlice.reducer;
