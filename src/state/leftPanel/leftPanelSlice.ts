import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserProfileType } from "../../lib/interfaces";
import { getTopUsers } from "../../api/gets/getTopUsers";


export const loadTopUsers = createAsyncThunk(
  "leftPanel/loadTopUsers",
  async (_, { getState }) => {
    const token = getState() as { auth: { token: string } };
    const response = await getTopUsers(token.auth.token);
    return response;
  }
);

interface LeftPanelState {
  title: string;
  toggled: boolean;
  topUsers: UserProfileType[];

}


const initialState: LeftPanelState = {
  title: "Search",
  toggled: false,
  topUsers: [],
};


const leftPanelSlice = createSlice({
  name: "leftPanel",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setToggled: (state, action) => {
      state.toggled = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTopUsers.fulfilled, (state, action) => {
      state.topUsers = action.payload;
    });
  },
});


export const { setTitle, setToggled } = leftPanelSlice.actions;
export default leftPanelSlice.reducer;

