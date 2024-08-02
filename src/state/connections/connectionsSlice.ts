import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserConnections } from "../../api/gets/getUserConnections";
import { postConnectToPerson } from "../../api/posts/postConnectToPerson";
import { UserProfileType } from "../../lib/interfaces";
import { postAcceptRejectEvents } from "../../api/posts/postAcceptRejectEvents";
import { ConnectionRequestType } from "../../lib/interfaces/ConnectionRequestType";
import { postRemoveConnection } from "../../api/posts/postRemoveConnection";

interface ConnectionsState {
  connections: any[];
  requests: ConnectionRequestType[];
}

const initialState: ConnectionsState = {
  connections: [],
  requests: [],
};

export const removeConnection = createAsyncThunk(
  "connections/removeConnection",
  async (people_id: number, { getState }) => {
    const token = (getState() as any).auth.token;
    const apiResponse = await postRemoveConnection(token, people_id);
    const response = {
      status: apiResponse?.status,
      personId: people_id,
    };
    return response;
  }
);

export const acceptConnection = createAsyncThunk(
  "connections/acceptConnection",
  async (event_id: number, { getState }) => {
    const token = (getState() as any).auth.token;
    const apiResponse = await postAcceptRejectEvents({
      token,
      data: { connection_accept: event_id },
    });
    const response = {
      status: apiResponse?.status,
      event_id,
    };
    return response;
  }
);

export const rejectConnection = createAsyncThunk(
  "connections/rejectConnection",
  async (event_id: number, { getState }) => {
    const token = (getState() as any).auth.token;
    const apiResponse = await postAcceptRejectEvents({
      token,
      data: { connection_reject: event_id },
    });
    const response = {
      status: apiResponse?.status,
      event_id,
    };
    return response;
  }
);

export const fetchConnections = createAsyncThunk(
  "connections/fetchConnections",
  async (_, { getState }) => {
    const token = (getState() as any).auth.token;
    const connections = await getUserConnections(token);
    return connections;
  }
);

export const connectToPerson = createAsyncThunk(
  "connections/connectToPerson",
  async (personId: number, { getState }) => {
    const token = (getState() as any).auth.token;
    const apiResponse = await postConnectToPerson({
      token,
      people_id: personId.toString(),
    });

    console.log("connectToPerson in connectionsSlice.ts", apiResponse);

    if (apiResponse === "failed" ) {
      return {
        status: 400,
        personId,
      };
    }
      const response = {
        status: 200,
        personId,
      };

    return response;
  }
);

const connectionsSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    setConnections: (state, action) => {
      state.connections = action.payload;
    },
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConnections.fulfilled, (state, action) => {
      state.connections = action.payload;
    });
    builder.addCase(connectToPerson.fulfilled, (state, action) => {});
    builder.addCase(acceptConnection.fulfilled, (state, action) => {
      state.requests = state.requests.filter(
        (request) => request.event_id !== action.payload.event_id
      );
    });
    builder.addCase(rejectConnection.fulfilled, (state, action) => {
      state.requests = state.requests.filter(
        (request) => request.event_id !== action.payload.event_id
      );
    });
    builder.addCase(removeConnection.fulfilled, (state, action) => {
      state.connections = state.connections.filter(
        (connection) => connection.user_id !== action.payload.personId
      );
    });
  },
});

export const { setConnections, setRequests } = connectionsSlice.actions;
export default connectionsSlice.reducer;
