import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SharedLinkType } from "../../lib/interfaces";
import { getUserLinks } from "../../api/getUserLinks";
import { set } from "react-hook-form";


export const fetchUserLinks = createAsyncThunk(
  "linkManagement/fetchUserLinks",
  async (token: string) => {
    const response = await getUserLinks(token);
    return response;
  }
);

interface LinkManagementState {
  linkMode: "edit" | "create";
  linkClass: "all" | "link" | "category";
  linkType: "all" | "article" | "video" | "podcast" | "image" | "other";
  selectedLinks: SharedLinkType[];
  userLinks: SharedLinkType[];
  linksToDisplay: SharedLinkType[];
  query: string;
  timeSensitive: "all" | "scheduled" | "expiresSoon" | "comeSoon";
  viewSize: "small" | "medium" | "large" | "details";
  showSelector: string;
  showFilter: boolean;
}

const initialState: LinkManagementState = {
  linkMode: "create",
  selectedLinks: [],
  userLinks: [],
  linksToDisplay: [],
  query: "",
  linkClass: "all",
  linkType: "all",
  timeSensitive: "all",
  viewSize: "details",
  showSelector: "",
  showFilter: false,
};




const linkManagementSlice = createSlice({
  name: "linkManagement",
  initialState,
  reducers: {
    setLinkMode: (state, action: PayloadAction<"edit" | "create">) => {
      state.linkMode = action.payload;
    },
    setSelectedLinks: (state, action: PayloadAction<SharedLinkType[]>) => {
      state.selectedLinks = action.payload;
    },
    setUserLinks: (state, action: PayloadAction<SharedLinkType[]>) => {
      state.userLinks = action.payload;
    },
    setLinksToDisplay: (state, action: PayloadAction<SharedLinkType[]>) => {
      state.linksToDisplay = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      if (action.payload === "") {
        state.linksToDisplay = state.userLinks;
      } else {
        state.linksToDisplay = state.userLinks.filter((link) =>
          link.title.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
    setLinkClass: (
      state,
      action: PayloadAction<"all" | "link" | "category">
    ) => {
      state.linkClass = action.payload;
      state.linksToDisplay = state.userLinks.filter((link) => {
        if (action.payload === "all") {
          return true;
        }
      });
    },
    setLinkType: (
      state,
      action: PayloadAction<
        "all" | "article" | "video" | "podcast" | "image" | "other"
      >
    ) => {
      state.linkType = action.payload;
      if (action.payload === "all") {
        state.linksToDisplay = state.userLinks;
      } else {
        state.linksToDisplay = state.userLinks.filter(
          (link) => link.url_type === action.payload
        );
      }
    },
    setTimeSensitive: (
      state,
      action: PayloadAction<"all" | "scheduled" | "expiresSoon" | "comeSoon">
    ) => {
      state.timeSensitive = action.payload;
    },
    setViewSize: (
      state,
      action: PayloadAction<"small" | "medium" | "large" | "details">
    ) => {
      state.viewSize = action.payload;
    },
    setShowSelector: (state, action: PayloadAction<string>) => {
      state.showSelector = action.payload;
    },
    setShowFilter: (state, action: PayloadAction<boolean>) => {
      state.showFilter = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserLinks.fulfilled, (state, action) => {
      state.userLinks = action.payload;
      state.linksToDisplay = action.payload;
    });
  },
});

export const {
  setLinkMode,
  setSelectedLinks,
  setUserLinks,
  setQuery,
  setLinksToDisplay,
  setLinkClass,
  setLinkType,
  setTimeSensitive,
  setViewSize,
  setShowSelector,
  setShowFilter,
} = linkManagementSlice.actions;
export default linkManagementSlice.reducer;
