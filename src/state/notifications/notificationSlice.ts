import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getNotifications } from "../../api/gets/getNotifications";
import { postAcceptRejectEvents } from "../../api/posts/postAcceptRejectEvents";
import { setRequests } from "../connections/connectionsSlice";
import { NotificationType } from "../../lib/interfaces/NotificationType";

interface NotificationsState {
  notifications: NotificationType;
}

const initialState: NotificationsState = {
  notifications: {
    connection_request: [],
    shared: [],
  },
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { getState, dispatch }) => {
    const token = (getState() as any).auth.token;
    const notifications = await getNotifications(token);
    dispatch(setRequests(notifications.connection_request));
    return notifications;
  }
);

interface AcceptLinksPayload {
  links: number[];
  sharedIndex: number;
}
export const acceptLinks = createAsyncThunk(
  "notifications/acceptLinks",
  async ({ links, sharedIndex }: AcceptLinksPayload, { getState }) => {
    const token = (getState() as any).auth.token;
    const apiResponse = await postAcceptRejectEvents({
      token,
      data: { shared_accept: links },
    });
    const response = {
      status: apiResponse?.status,
      links,
      sharedIndex,
    };

    return response;
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<NotificationType>) => {
      state.notifications = action.payload;
    },
    removeRequestFromNotifications: (state, action: PayloadAction<number>) => {
      state.notifications.connection_request =
        state.notifications.connection_request.filter(
          (request) => request.event_id !== action.payload
        );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
    });

    builder.addCase(acceptLinks.fulfilled, (state, action) => {
      const acceptedLinksEventIds = action.payload.links;
      if (action.payload.status === 200) {
        state.notifications.shared[action.payload.sharedIndex].links =
          state.notifications.shared[action.payload.sharedIndex].links.filter(
            (link) => !acceptedLinksEventIds.includes(link.event_id)
          );
      }
      if (
        state.notifications.shared[action.payload.sharedIndex].links.length ===
        0
      ) {
        state.notifications.shared.splice(action.payload.sharedIndex, 1);
      }
    });
  },
});

export const { setNotifications, removeRequestFromNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
