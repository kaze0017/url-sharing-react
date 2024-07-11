import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  SharedLinkType,
  UserProfileType,
  groupType,
} from "../../lib/interfaces";
import { GroupType } from "../../lib/interfaces/group";
import { getUserGroups } from "../../api/gets/getUserGroups";
import { getTopUsers } from "../../api/gets/getTopUsers";
import { getUserByQuery } from "../../api/gets/getUserByQuery";
import { postShareLinks } from "../../api/posts/postShareLinks";
import { RootState } from "../store";

export const fetchUserGroups = createAsyncThunk(
  "groups/fetchUserGroups",
  async (token: string) => {
    const response = await getUserGroups(token);
    return response;
  }
);

export const fetchTopUsers = createAsyncThunk(
  "groups/fetchTopUsers",
  async (token: string) => {
    const response = await getTopUsers(token);
    return response;
  }
);

export const fetchSearchedUsers = createAsyncThunk(
  "groups/fetchSearchedUsers",
  async (args: { token: string; query: string }, { dispatch }) => {
    dispatch(setQuery(args.query));
    if (args.query === "") {
      return [];
    }
    const response = await getUserByQuery(args.token, args.query);
    return response;
  }
);

export const handelSearch = createAsyncThunk(
  "groups/handelSearch",
  async (args: { query: string; token: string }, { dispatch }) => {
    dispatch(shareWithGroupsSlice.actions.setQuery(args.query));
    if (args.query === "") {
      return;
    }
    await dispatch(fetchSearchedUsers(args));
    await dispatch(fetchUserGroups(args.token));
  }
);

// Share Links with Groups and Individuals

export const shareWithGroups = createAsyncThunk(
  "share/shareWithGroups",
  async (token: string, { getState }) => {
    const shareState = (getState() as RootState).share;
    const linkManagementState = (getState() as RootState).linkManagement;

    const data = {
      message: shareState.description,
      description: shareState.description,
      link_ids: linkManagementState.selectedLinks.map(
        (link: SharedLinkType) => link.id
      ),
      user_ids: shareState.selectedPeople.map(
        (person: UserProfileType) => person.user_id
      ),
      group_ids: shareState.selectedGroups.map(
        (group: GroupType) => group.group_id
      ),
      expirationDate: shareState.expirationDate,
      publicationDate: shareState.publicationDate,
    };
    const response = await postShareLinks({ token, data });
    return { status: response?.status, message: response?.data?.message };
  }
);

export const initShareWithGroupsSlice = createAsyncThunk(
  "share/initShareWithGroups",
  async (token: string, { dispatch }) => {
    dispatch(shareWithGroupsSlice.actions.initState());
    const topU = await getTopUsers(token);
    const topG = await getUserGroups(token);
    dispatch(shareWithGroupsSlice.actions.setTopPeople(topU));
    dispatch(shareWithGroupsSlice.actions.setPeopleToDisplay(topU));
    dispatch(shareWithGroupsSlice.actions.setTopGroups(topG));
    dispatch(shareWithGroupsSlice.actions.setGroupsToDisplay(topG));
  }
);

interface ShareWithGroupsState {
  mode: "users" | "groups" | "selected";
  status:
    | "loading"
    | "error"
    | "success"
    | "noLinks"
    | "approval"
    | "sharingOptions"
    | "selectingRecipients";
  query: string;
  topPeople: UserProfileType[];
  searchedPeople: UserProfileType[];
  selectedPeople: UserProfileType[];
  peopleToDisplay: UserProfileType[];
  topGroups: GroupType[];
  selectedGroups: GroupType[];
  searchedGroups: GroupType[];
  groupsToDisplay: GroupType[];
  publicationDate: string;
  expirationDate: string;
  description: string;
}

const initialState: ShareWithGroupsState = {
  mode: "users",
  status: "sharingOptions",
  query: "",
  topPeople: [],
  searchedPeople: [],
  selectedPeople: [],
  peopleToDisplay: [],
  selectedGroups: [],
  groupsToDisplay: [],
  topGroups: [],
  searchedGroups: [],
  publicationDate: "Today",
  expirationDate: "No expiration date",
  description: "",
};

const shareWithGroupsSlice = createSlice({
  name: "shareWithGroups",
  initialState,
  reducers: {
    initState(state) {
      return initialState;
    },

    setMode(state, action: PayloadAction<"users" | "groups" | "selected">) {
      state.mode = action.payload;
    },
    setStatus(state, action: PayloadAction<ShareWithGroupsState["status"]>) {
      state.status = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      if (state.query === "") {
        state.peopleToDisplay = state.topPeople.filter(
          (person) => !state.selectedPeople.includes(person)
        );
        state.groupsToDisplay = state.topGroups.filter(
          (group) => !state.selectedGroups.includes(group)
        );
      } else {
        state.peopleToDisplay = state.searchedPeople.filter(
          (person) => !state.selectedPeople.includes(person)
        );
        state.groupsToDisplay = state.searchedGroups.filter(
          (group) => !state.selectedGroups.includes(group)
        );
      }
    },
    setTopPeople(state, action: PayloadAction<UserProfileType[]>) {
      state.topPeople = action.payload;
    },
    setSearchedPeople(state, action: PayloadAction<UserProfileType[]>) {
      state.searchedPeople = action.payload;
      if (state.query === "") {
        state.peopleToDisplay = state.topPeople.filter(
          (person) =>
            !state.selectedPeople.some((p) => p.user_id === person.user_id)
        );
      } else {
        state.peopleToDisplay = state.searchedPeople.filter(
          (person) =>
            !state.selectedPeople.some((p) => p.user_id === person.user_id)
        );
      }
    },
    setSelectedPeople(state, action: PayloadAction<UserProfileType[]>) {
      state.selectedPeople = action.payload;
      if (state.query === "") {
        state.peopleToDisplay = state.topPeople.filter(
          (person) =>
            !state.selectedPeople.some((p) => p.user_id === person.user_id)
        );
      } else {
        state.peopleToDisplay = state.searchedPeople.filter(
          (person) =>
            !state.selectedPeople.some((p) => p.user_id === person.user_id)
        );
      }
    },
    setTopGroups(state, action: PayloadAction<GroupType[]>) {
      state.topGroups = action.payload;
    },

    setPeopleToDisplay(state, action: PayloadAction<UserProfileType[]>) {
      state.peopleToDisplay = action.payload;
    },
    setSelectedGroups(state, action: PayloadAction<GroupType>) {
      if (
        state.selectedGroups.some(
          (group) => group.group_id === action.payload.group_id
        )
      ) {
        state.selectedGroups = state.selectedGroups.filter(
          (group) => group.group_id !== action.payload.group_id
        );
        state.groupsToDisplay = [...state.groupsToDisplay, action.payload];
      } else {
        state.selectedGroups = [...state.selectedGroups, action.payload];
        state.groupsToDisplay = state.groupsToDisplay.filter(
          (group) => group.group_id !== action.payload.group_id
        );
      }
    },

    setGroupsToDisplay(state, action: PayloadAction<GroupType[]>) {
      state.groupsToDisplay = action.payload;
    },
    setPublicationDate(state, action: PayloadAction<string>) {
      state.publicationDate = action.payload;
    },
    setExpirationDate(state, action: PayloadAction<string>) {
      state.expirationDate = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserGroups.fulfilled, (state, action) => {
      return {
        ...state,
        topGroups: action.payload,
        searchedGroups: action.payload,
        groupsToDisplay: action.payload
          .filter((group: GroupType) => !state.selectedGroups.includes(group))
          .filter((group: groupType) =>
            group.description.includes(state.query)
          ),
      };
    });

    builder.addCase(fetchTopUsers.fulfilled, (state, action) => {
      return {
        ...state,
        topPeople: action.payload,
        peopleToDisplay: action.payload,
      };
    });

    builder.addCase(fetchSearchedUsers.fulfilled, (state, action) => {
      if (state.query === "") {
        return {
          ...state,
          searchedPeople: action.payload,
          peopleToDisplay: state.topPeople.filter(
            (person) =>
              !state.selectedPeople.some((p) => p.user_id === person.user_id)
          ),
        };
      } else {
        return {
          ...state,
          searchedPeople: action.payload,
          peopleToDisplay: action.payload.filter(
            (person: UserProfileType) =>
              !state.selectedPeople.some((p) => p.user_id === person.user_id)
          ),
        };
      }
    });

    builder.addCase(handelSearch.fulfilled, (state, action) => {
      if (state.query === "") {
        return state;
      }
    });

    builder.addCase(shareWithGroups.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(shareWithGroups.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.status = "success";
      } else {
        state.status = "error";
        console.log("error", action.payload.message);
      }
    });
  },
});

export const {
  setMode,
  setStatus,
  setQuery,
  setTopPeople,
  setSearchedPeople,
  setSelectedPeople,
  setPeopleToDisplay,
  setSelectedGroups,
  setGroupsToDisplay,
  setPublicationDate,
  setExpirationDate,
  setDescription,
  initState,
} = shareWithGroupsSlice.actions;

export default shareWithGroupsSlice.reducer;
