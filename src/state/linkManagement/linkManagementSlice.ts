import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SharedLinkType } from "../../lib/interfaces";
import { CategoryType } from "../../lib/interfaces/categoryType";
import { ContentType } from "../../lib/interfaces/contentType";
import { getUserLinks } from "../../api/gets/getUserLinks";
import { deleteLinks } from "../../api/posts/postDeleteLinks";
import { fetchUserLinks } from "./linkSlice";
import { title } from "process";

// export const fetchUserLinks = createAsyncThunk(
//   "linkManagement/fetchUserLinks",
//   async (token: string) => {
//     const response = await getUserLinks(token);
//     return response;
//   }
// );

export const fetchUserContent = createAsyncThunk(
  "linkManagement/fetchContent",
  async (_, { dispatch }) => {
    console.log("contentSlice -> fetchUserContent");
    const links = (await dispatch(
      fetchUserLinks()
    ).unwrap()) as SharedLinkType[];
    const contents: ContentType[] = links.map((link) => {
      return mapLinkToContent(link);
    });
    return contents;
  }
);

// export const deleteSelectedLinks = createAsyncThunk(
//   "linkManagement/deleteSelectedLinks",
//   async (token: string, { getState, dispatch }) => {
//     const state = getState() as { linkManagement: LinkManagementState };
//     const selectedLinksIds = state.linkManagement.selectedLinks.map(
//       (link) => link.id
//     );
//     const response = await deleteLinks({ token, ids: selectedLinksIds });
//     await dispatch(fetchUserLinks(token));
//     return response.data;
//   }
// );

// interface LinkManagementState {
//   linkMode: "edit" | "create";
//   linkClass: "all" | "link" | "category";
//   linkType: "all" | "article" | "video" | "podcast" | "image" | "other";
//   selectedLinks: SharedLinkType[];
//   userLinks: SharedLinkType[];
//   linksToDisplay: SharedLinkType[];
//   query: string;
//   timeSensitive: "all" | "scheduled" | "expiresSoon" | "comeSoon";
//   viewSize: "small" | "medium" | "large" | "details";
//   showSelector: string;
//   showFilter: boolean;
// }
interface LinkManagementState {
  contentClass: "all" | "link" | "category";
  type: "all" | "article" | "video" | "podcast" | "image" | "other";
  contents: ContentType[];
  contentsToDisplay: ContentType[];
  selectedContents: ContentType[];
  query: string;
  timeSensitive: "all" | "scheduled" | "expiresSoon" | "comeSoon";
  viewSize: "small" | "medium" | "large" | "details";
  showSelector: string;
  showFilter: boolean;
  selectedLinks: SharedLinkType[];
  selectedCategories: CategoryType[];
}

// const initialState: LinkManagementState = {
//   linkMode: "create",
//   selectedLinks: [],
//   userLinks: [],
//   linksToDisplay: [],
//   query: "",
//   linkClass: "all",
//   linkType: "all",
//   timeSensitive: "all",
//   viewSize: "details",
//   showSelector: "",
//   showFilter: false,
// };
const initialState: LinkManagementState = {
  contents: [],
  contentsToDisplay: [],
  selectedContents: [],
  query: "",
  contentClass: "all",
  type: "all",
  timeSensitive: "all",
  viewSize: "details",
  showSelector: "",
  showFilter: false,
  selectedLinks: [],
  selectedCategories: [],
};

const linkManagementSlice = createSlice({
  name: "linkManagement",
  initialState,
  reducers: {
    setContentToDisplay: (state, action: PayloadAction<ContentType[]>) => {
      state.contentsToDisplay = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      if (action.payload === "") {
        state.contentsToDisplay = state.contents;
      } else {
        state.contentsToDisplay = state.contents.filter((content) =>
          content.contentClass === "link"
            ? content.link.title.includes(action.payload)
            : content.category.title.includes(action.payload)
        );
      }
    },
    setClass: (state, action: PayloadAction<"all" | "link" | "category">) => {
      state.contentClass = action.payload;
      state.contentsToDisplay = state.contents.filter((content) => {
        if (action.payload === "all") {
          return true;
        } else if (action.payload === "link") {
          return content.contentClass === "link";
        } else {
          return content.contentClass === "category";
        }
      });
    },
    setType: (
      state,
      action: PayloadAction<
        "all" | "article" | "video" | "podcast" | "image" | "other"
      >
    ) => {
      state.type = action.payload;
      if (action.payload === "all") {
        state.contentsToDisplay = state.contents;
      } else {
        state.contentsToDisplay = state.contents.filter((content) =>
          content.contentClass === "link"
            ? content.link.url_type === action.payload
            : content.category.type === action.payload
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
    },
    setSelectedContents: (state, action: PayloadAction<ContentType[]>) => {
      state.selectedContents = action.payload;
    },
    // Working on this ******************************************************
    deleteSelectedContents: (state) => {
      state.selectedContents = [];
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUserLinks.fulfilled, (state, action) => {
  //     return {
  //       ...state,
  //       userLinks: action.payload,
  //       linksToDisplay: action.payload,
  //       selectedLinks: [],
  //     };
  //   });
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchUserContent.fulfilled, (state, action) => {
      console.log("contentSlice -> extraReducers -> fetchUserContent -> action", action);
      return {
        ...state,
        content: action.payload,
        contentToDisplay: action.payload,
      };
    });
  },
});

export const {
  setQuery,
  setType,
  setClass,
  setTimeSensitive,
  setViewSize,
  setShowSelector,
  setShowFilter,
  setContentToDisplay,
  setSelectedContents,
  deleteSelectedContents,
} = linkManagementSlice.actions;
export default linkManagementSlice.reducer;

function mapLinkToContent(link: SharedLinkType) {
  const content: ContentType = {
    id: link.id,
    contentClass: "link",
    link: link,
    category: {
      category_id: 0,
      title: "",
      owner: "add",
      tags: [],
    },
  };
  console.log(" contentSlice -> mapLinkToContent -> content", content);
  return content;
}
