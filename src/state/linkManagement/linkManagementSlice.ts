import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { SharedLinkType } from "../../lib/interfaces";
import { CategoryType } from "../../lib/interfaces/categoryType";
import { ContentType } from "../../lib/interfaces/contentType";
import {
  deleteSelectedLinks,
  fetchUserLinks,
  setSelectedLinks,
} from "./linkSlice";
import {
  deleteSelectedCategories,
  fetchUserCategories,
  setSelectedCategories,
} from "./categorySlice";
import mapCategoryToContent from "../../lib/functions/mapCategoryToContent";
import mapLinkToContent from "../../lib/functions/mapLinkToContent";

// Thunk action to fetch user content and map it to ContentType[]
export const fetchUserContent = createAsyncThunk(
  "linkManagement/fetchContent",
  async (_, { dispatch }) => {
    const links = (await dispatch(
      fetchUserLinks()
    ).unwrap()) as SharedLinkType[];

    const categories = (await dispatch(
      fetchUserCategories()
    ).unwrap()) as CategoryType[];

    const contents: ContentType[] = links
      .map((link) => mapLinkToContent(link))
      .concat(categories.map((category) => mapCategoryToContent(category)));

    return contents;
  }
);

// Thunk action to set selected contents and update other slices accordingly
// export const updateSelectedContents =
//   (contents: ContentType[]): AppThunk =>
//   (dispatch, getState) => {
//     // Update selected contents in linkManagement slice
//     dispatch(setSelectedContents(contents));

//     // Extract and update selected links and categories in their respective slices
//     const selectedLinks = contents.filter(
//       (content) => content.contentClass === "link"
//     );
//     const selectedCategories = contents.filter(
//       (content) => content.contentClass === "category"
//     );

//     dispatch(setSelectedLinks(selectedLinks));
//     dispatch(setSelectedCategories(selectedCategories));
//   };

export const setSelectedContentsLinksCategories =
  (Contents: ContentType[]): AppThunk =>
  (dispatch: any, getState: any) => {

    
    dispatch(setSelectedContents(Contents));

    console.log("Contents:", Contents);

    // Filter contents to get the links
    const SelectedLinksIds = Contents.filter(
      (content) => content.contentClass === "link"
    ).map((content) => content.id);
    const SelectedCategoriesIds = Contents.filter(
      (content) => content.contentClass === "category"
    ).map((content) => content.id);

    const state = getState();
    const links = state.link.userLinks;
    const categories = state.category.userCategories;

    const selectedLinks = links.filter((link: SharedLinkType) =>
      SelectedLinksIds.includes(link.id)
    );
    const selectedCategories = categories.filter((category: CategoryType) =>
      SelectedCategoriesIds.includes(category.category_id)
    );

    dispatch(setSelectedLinks(selectedLinks));
    dispatch(setSelectedCategories(selectedCategories));

    if (SelectedLinksIds.length === 0 && SelectedCategoriesIds.length === 0) {
      dispatch(setSelectedContentsType("all"));
    } else if (
      SelectedLinksIds.length > 0 &&
      SelectedCategoriesIds.length === 0
    ) {
      dispatch(setSelectedContentsType("link"));
    } else if (
      SelectedLinksIds.length === 0 &&
      SelectedCategoriesIds.length > 0
    ) {
      dispatch(setSelectedContentsType("category"));
    } else {
      dispatch(setSelectedContentsType("all"));
    }


    console.log("SelectedLinksIds:", SelectedLinksIds);
    console.log("SelectedCategoriesIds:", SelectedCategoriesIds);
  };

export const deleteSelectedContents = createAsyncThunk(
  "linkManagement/deleteSelectedContents",
  async (_, { getState, dispatch }) => {
    const linkState = getState() as {
      link: { selectedLinks: SharedLinkType[] };
    };
    const categoryState = getState() as {
      category: { selectedCategories: CategoryType[] };
    };
    if (linkState.link.selectedLinks.length > 0) {
      linkState.link.selectedLinks.forEach((link) => {
        dispatch(deleteSelectedLinks());
      });
    }
    if (categoryState.category.selectedCategories.length > 0) {
      dispatch(deleteSelectedCategories());
    }

    const updatedContents = await dispatch(fetchUserContent());
    dispatch(setSelectedContents([]));
    dispatch(setContentToDisplay(updatedContents.payload as ContentType[]));
  }
);

interface LinkManagementState {
  contentClass: "all" | "link" | "category";
  type: "all" | "article" | "video" | "podcast" | "image" | "other";
  contents: ContentType[];
  contentsToDisplay: ContentType[];
  selectedContents: ContentType[];
  selectedContentsType: "link" | "category" | "all";
  query: string;
  timeSensitive: "all" | "scheduled" | "expiresSoon" | "comeSoon";
  viewSize: "small" | "medium" | "large" | "details";
  showSelector: string;
  showFilter: boolean;
  selectedLinks: SharedLinkType[];
  selectedCategories: CategoryType[];
}

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
  selectedContentsType: "all",
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
          content.title.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
    setClass: (state, action: PayloadAction<"all" | "link" | "category">) => {
      console.log("ff setClass:", action.payload);
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
            ? content.type === action.payload
            : content
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
      const categories = state.selectedContents.filter(
        (content) => content.contentClass === "category"
      );
    },
    setSelectedContentsType: (
      state,
      action: PayloadAction<"link" | "category" | "all">
    ) => {
      state.selectedContentsType = action.payload;
    },
    // deleteSelectedContents: (state) => {
    //   state.selectedContents = [];
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserContent.fulfilled, (state, action) => {
      return {
        ...state,
        contents: action.payload,
        contentsToDisplay: action.payload,
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
  setSelectedContentsType,
  // deleteSelectedContents,
} = linkManagementSlice.actions;
export default linkManagementSlice.reducer;
