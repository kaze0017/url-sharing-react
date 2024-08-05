import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SharedLinkType } from "../../lib/interfaces";
import { getTopSharedLinks } from "../../api/gets/getTopSharedLinks";
import { getTopSharedCategories } from "../../api/gets/getTopSharedCategories";
import { CategoryType } from "../../lib/interfaces/categoryType";
import { getQuickAccessLinks } from "../../api/gets/getQuickAccessLinks";
import { getPublicLinks } from "../../api/gets/getPublicLinks";
import { getPopularLinks } from "../../api/gets/getPopularLinks";
import { setLinks } from "./homeSlice";

// Define async thunks


// HotLinks
export const loadHotLinks = createAsyncThunk(
  "hotLinks/fetchHotLinks",
  async (_, { getState }) => {
    const authState = getState() as { auth: { token: string } };
    const response = await getTopSharedLinks(authState.auth.token);
    return response;
  }
);

// HotCategories
export const loadHotCategories = createAsyncThunk(
  "hotLinks/fetchHotCategories",
  async (_, { getState }) => {
    const authState = getState() as { auth: { token: string } };
    const response = await getTopSharedCategories(authState.auth.token);
    return response;
  }
);

// QuickAccessLinks
export const loadQuickAccessLinks = createAsyncThunk(
  "hotLinks/fetchQuickAccessLinks",
  async (_, { getState, dispatch }) => {
    const authState = getState() as { auth: { token: string } };
    const response = await getQuickAccessLinks(authState.auth.token);
    dispatch(setLinks(response));
    return response;
  }
);

// PublicLinks
export const loadPublicLinks = createAsyncThunk(
  "hotLinks/fetchPublicLinks",
  async (_, { getState, dispatch }) => {
    const authState = getState() as { auth: { token: string } };
    const response = await getPublicLinks(authState.auth.token);
    dispatch(setLinks(response));
    return response;
  }
);

// PopularLinks
export const loadPopularLinks = createAsyncThunk(
  "hotLinks/fetchPopularLinks",
  async (_, { getState, dispatch }) => {
    const authState = getState() as { auth: { token: string } };
    const response = await getPopularLinks(authState.auth.token);
    dispatch(setLinks(response));
    return response;
  }
);

// Define the initial state
interface TopContentsState {
  hotCategories: CategoryType[];
  hotLinks: SharedLinkType[];
  quickAccessLinks: SharedLinkType[];
  publicLinks: SharedLinkType[];
  popularLinks: SharedLinkType[];
  loadingHotLinks: boolean;
  loadingHotCategories: boolean;
  loadingQuickAccessLinks: boolean;
  loadingPublicLinks: boolean;
  loadingPopularLinks: boolean;
  errorHotLinks: string | null;
  errorHotCategories: string | null;
  errorQuickAccessLinks: string | null;
  errorPublicLinks: string | null;
  errorPopularLinks: string | null;
}

const initialState: TopContentsState = {
  hotLinks: [],
  hotCategories: [],
  quickAccessLinks: [],
  publicLinks: [],
  popularLinks: [],
  loadingHotLinks: false,
  loadingHotCategories: false,
  errorHotLinks: null,
  errorHotCategories: null,
  loadingQuickAccessLinks: false,
  loadingPublicLinks: false,
  loadingPopularLinks: false,
  errorQuickAccessLinks: null,
  errorPublicLinks: null,
  errorPopularLinks: null,
};

// Create the slice
const hotLinksSlice = createSlice({
  name: "hotLinks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending state
    builder.addCase(loadHotLinks.pending, (state) => {
      state.loadingHotLinks = true;
      state.errorHotLinks = null;
    });
    builder.addCase(loadHotCategories.pending, (state) => {
      state.loadingHotCategories = true;
      state.errorHotCategories = null;
    });
    builder.addCase(loadQuickAccessLinks.pending, (state) => {
      state.loadingQuickAccessLinks = true;
      state.errorQuickAccessLinks = null;
    });
    builder.addCase(loadPublicLinks.pending, (state) => {
      state.loadingPublicLinks = true;
      state.errorPublicLinks = null;
    });
    builder.addCase(loadPopularLinks.pending, (state) => {
      state.loadingPopularLinks = true;
      state.errorPopularLinks = null;
    });

    // Handle fulfilled state
    builder.addCase(loadHotLinks.fulfilled, (state, action) => {
      state.hotLinks = action.payload;
      state.loadingHotLinks = false;
    });
    builder.addCase(loadHotCategories.fulfilled, (state, action) => {
      state.hotCategories = action.payload;
      state.loadingHotCategories = false;
    });
    builder.addCase(loadQuickAccessLinks.fulfilled, (state, action) => {
      state.quickAccessLinks = action.payload;
      state.loadingQuickAccessLinks = false;
    });
    builder.addCase(loadPublicLinks.fulfilled, (state, action) => {
      state.publicLinks = action.payload;
      state.loadingPublicLinks = false;
    });
    builder.addCase(loadPopularLinks.fulfilled, (state, action) => {
      state.popularLinks = action.payload;
      state.loadingPopularLinks = false;
    });

    // Handle rejected state
    builder.addCase(loadHotLinks.rejected, (state, action) => {
      state.loadingHotLinks = false;
      state.errorHotLinks = action.error.message || "Failed to load hot links.";
    });
    builder.addCase(loadQuickAccessLinks.rejected, (state, action) => {
      state.loadingQuickAccessLinks = false;
      state.errorQuickAccessLinks =
        action.error.message || "Failed to load quick access links.";
    }
    );  
    builder.addCase(loadPublicLinks.rejected, (state, action) => {
      state.loadingPublicLinks = false;
      state.errorPublicLinks =
        action.error.message || "Failed to load public links.";
    });
    builder.addCase(loadPopularLinks.rejected, (state, action) => {
      state.loadingPopularLinks = false;
      state.errorPopularLinks =
        action.error.message || "Failed to load popular links.";
    });

    builder.addCase(loadHotCategories.rejected, (state, action) => {
      state.loadingHotCategories = false;
      state.errorHotCategories =
        action.error.message || "Failed to load hot categories.";
    });
  },
});

export default hotLinksSlice.reducer;
