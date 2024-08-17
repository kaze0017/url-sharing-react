import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SharedLinkType } from "../../lib/interfaces";
import { getUserLinks } from "../../api/gets/getUserLinks";
import { deleteLinks } from "../../api/posts/postDeleteLinks";
import { likeLink } from "../../api/posts/postLikeLink";
import { postQuickAccessLinks } from "../../api/posts/postQuickAccessLinks";
import { AppThunk } from "../store";

export const fetchUserLinks = createAsyncThunk(
  "link/fetchUserLinks",
  async (_, { getState }) => {
    const authState = getState() as { auth: { token: string } };
    const response = await getUserLinks(authState.auth.token);
    return response;
  }
);

export const deleteSelectedLinks = createAsyncThunk(
  "link/deleteSelectedLinks",
  async (_, { getState, dispatch }) => {
    const state = getState() as { link: LinkState; auth: { token: string } };
    const token = state.auth.token;
    const selectedLinksIds = state.link.selectedLinks.map((link) => link.id);
    const response = await deleteLinks({ token, ids: selectedLinksIds });
    await dispatch(fetchUserLinks());
    return response.data;
  }
);

export const likeTheLink = createAsyncThunk(
  "link/likeSelectedLinks",
  async (id: number, { getState, dispatch }) => {
    const state = getState() as { link: LinkState; auth: { token: string } };
    const response = await likeLink({ token: state.auth.token, id });
    return response.data;
  }
);

export const postQuickAccess = createAsyncThunk(
  "link/postQuickAccess",
  async (id: number, { getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await postQuickAccessLinks({
      token: state.auth.token,
      links_add: id,
    });
    return response?.data;
  }
);

export const mapSelectedContentsToSelectedLinksIds =
  (): AppThunk => async (dispatch, getState) => {
    const state = getState() as {
      linkManagement: { selectedContents: any[] };
    };
    const selectedContents = state.linkManagement.selectedContents;
    console.log("sdfsdf", selectedContents);
    const selectedLinksIds = selectedContents
      .filter((content: any) => content.contentClass === "link")
      .map((content: any) => content.id);
    dispatch(setSelectedLinkIds(selectedLinksIds));
  };

interface LinkState {
  linkMode: "edit" | "create";
  linkType: "all" | "article" | "video" | "podcast" | "image" | "other";
  userLinks: SharedLinkType[];
  selectedLinks: SharedLinkType[];
  selectedLinkIds: number[];
}

const initialState: LinkState = {
  linkMode: "create",
  linkType: "all",
  selectedLinks: [],
  userLinks: [],
  selectedLinkIds: [],
};

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setLinkMode: (state, action: PayloadAction<"edit" | "create">) => {
      state.linkMode = action.payload;
    },
    setSelectedLinks: (state, action: PayloadAction<SharedLinkType[]>) => {
      state.selectedLinks = action.payload;
      state.selectedLinkIds = action.payload.map((link) => link.id);
    },
    setUserLinks: (state, action: PayloadAction<SharedLinkType[]>) => {
      state.userLinks = action.payload;
    },
    setSelectedLinkIds: (state, action: PayloadAction<number[]>) => {
      state.selectedLinkIds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserLinks.fulfilled, (state, action) => {
      return {
        ...state,
        userLinks: action.payload,
        selectedLinks: [],
      };
    });
  },
});

export const {
  setLinkMode,
  setSelectedLinks,
  setUserLinks,
  setSelectedLinkIds,
} = linkSlice.actions;
export default linkSlice.reducer;
