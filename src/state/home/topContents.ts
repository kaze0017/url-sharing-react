import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SharedLinkType } from "../../lib/interfaces";
import { getTopSharedLinks } from "../../api/gets/getTopSharedLinks";
import { getTopSharedCategories } from "../../api/gets/getTopSharedCategories";
import { CategoryType } from "../../lib/interfaces/categoryType";

export const loadHotLinks = createAsyncThunk(
  "link/fetchHotLinks",
  async (_, { getState }) => {
    const authState = getState() as { auth: { token: string } };
    const response = await getTopSharedLinks(authState.auth.token);
    console.log("top content links", response);
    return response;
  }
);

export const loadHotCategories = createAsyncThunk(
  "link/fetchHotCategories",
  async (_, { getState }) => {
    const authState = getState() as { auth: { token: string } };
    const response = await getTopSharedCategories(authState.auth.token);
    return response;
  }
);

interface TopContentsState {
  hotLinks: SharedLinkType[];
  hotCategories: CategoryType[];
}

const initialState: TopContentsState = {
  hotLinks: [],
  hotCategories: [],
};

const hotLinksSlice = createSlice({
  name: "hotLinks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadHotCategories.fulfilled, (state, action) => {
      state.hotCategories = action.payload;
    });
    builder.addCase(loadHotLinks.fulfilled, (state, action) => {
      state.hotLinks = action.payload;
    });
  },
});

export default hotLinksSlice.reducer;
