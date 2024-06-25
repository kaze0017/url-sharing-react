import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { GroupType } from "../../lib/interfaces/group";
import { getUserGroups } from "../../api/getUserGroups";
import { UserProfileType } from "../../lib/interfaces";
import { getTopUsers } from "../../api/getTopUsers";
import { getUserByQuery } from "../../api/getUserByQuery";

export const fetchUserGroups = createAsyncThunk(
  "groups/fetchUserGroups",
  async (token: string) => {
    console.log("fetching user groups");
    const response = await getUserGroups(token);
    return response;
  }
);

export const fetchTopUsers = createAsyncThunk(
  "groups/fetchTopUsers",
  async (token: string) => {
    console.log("fetching top users");
    const response = await getTopUsers(token);
    return response;
  }
);

export const fetchSearchedUsers = createAsyncThunk(
  "groups/fetchSearchedUsers",
  async (args: { token: string; query: string }) => {
    console.log("fetching searched users");
    if (args.query === "") {
      console.log("query is empty");
      return [];
    }
    const response = await getUserByQuery(args.token, args.query);
    return response;
  }
);

interface NetworkGroupsState {
  userGroups: GroupType[];
  userGroupsToDisplay: GroupType[];
  peopleToDisplay: UserProfileType[];
  topPeople: UserProfileType[];
  searchedPeople: UserProfileType[];
  query: string;
  peopleQuery: string;
  selectedGroup: GroupType;
  draggingMember: UserProfileType | null;
}

const initialState: NetworkGroupsState = {
  userGroups: [],
  userGroupsToDisplay: [],
  query: "",
  peopleQuery: "",
  peopleToDisplay: [],
  topPeople: [],
  searchedPeople: [],
  selectedGroup: {
    description: "",
    group_id: 0,
    members: [],
    name: "",
    tags: [],
  },
  draggingMember: null,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    initializeGroupSlice: (state) => {
      state.userGroups = [];
      state.userGroupsToDisplay = [];
      state.query = "";
      state.peopleQuery = "";
      state.peopleToDisplay = [];
      state.topPeople = [];
      state.searchedPeople = [];
      state.selectedGroup = {
        description: "",
        group_id: 0,
        members: [],
        name: "",
        tags: [],
      };
      state.draggingMember = null;
    },

    setDraggingMember: (
      state,
      action: PayloadAction<UserProfileType | null>
    ) => {
      state.draggingMember = action.payload;
      console.log("dragging member from slice", state.draggingMember);
    },
    setUserGroups: (state, action: PayloadAction<GroupType[]>) => {
      state.userGroups = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      if (state.query === "") {
        state.userGroupsToDisplay = state.userGroups;
      } else {
        state.userGroupsToDisplay = state.userGroups.filter((group) =>
          group.description.toLowerCase().includes(state.query.toLowerCase())
        );
      }
    },
    setPeopleQuery: (state, action: PayloadAction<string>) => {
      state.peopleQuery = action.payload;
    },
    addMember: (state, action: PayloadAction<UserProfileType>) => {
      if (
        state.selectedGroup.members.some(
          (p) => p.user_id === action.payload.user_id
        )
      ) {
        return state;
      }
      const updatedSelectedGroup = {
        ...state.selectedGroup,
        members: [...state.selectedGroup.members, action.payload],
      };
      const newPeopleToDisplay = state.peopleToDisplay.filter(
        (person) => person.user_id !== action.payload.user_id
      );
      return {
        ...state,
        selectedGroup: updatedSelectedGroup,
        peopleToDisplay: newPeopleToDisplay,
      };
    },

    setMembers: (state, action: PayloadAction<UserProfileType[]>) => {
      state.selectedGroup.members = action.payload;
    },
    setPeopleToDisplay: (state, action: PayloadAction<UserProfileType[]>) => {
      state.peopleToDisplay = action.payload;
    },
    removeMember: (state, action: PayloadAction<UserProfileType>) => {
      state.selectedGroup.members = state.selectedGroup.members.filter(
        (person) => person.user_id !== action.payload.user_id
      );
      state.peopleToDisplay.push(action.payload);
    },
    setSelectedGroup: (state, action: PayloadAction<GroupType>) => {
      state.selectedGroup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserGroups.fulfilled, (state, action) => {
      return {
        ...state,
        userGroups: action.payload,
        userGroupsToDisplay: action.payload,
      };
    });
    builder.addCase(fetchTopUsers.fulfilled, (state, action) => {
      return {
        ...state,
        topPeople: action.payload,
        peopleToDisplay: action.payload.filter(
          (person: UserProfileType) =>
            !state.selectedGroup.members.some(
              (p) => p.user_id === person.user_id
            )
        ),
      };
    });
    builder.addCase(fetchSearchedUsers.fulfilled, (state, action) => {
      if (state.peopleQuery === "") {
        return {
          ...state,
          searchedPeople: action.payload,
          peopleToDisplay: state.topPeople.filter(
            (person: UserProfileType) =>
              !state.selectedGroup.members.some(
                (p) => p.user_id === person.user_id
              )
          ),
        };
      } else {
        return {
          ...state,
          searchedPeople: action.payload,
          peopleToDisplay: action.payload.filter(
            (person: UserProfileType) =>
              !state.selectedGroup.members.some(
                (p) => p.user_id === person.user_id
              )
          ),
        };
      }
    });
  },
});

export const {
  setUserGroups,
  setQuery,
  removeMember,
  addMember,
  setPeopleToDisplay,
  setPeopleQuery,
  setMembers,
  setSelectedGroup,
  initializeGroupSlice,
  setDraggingMember,
} = groupsSlice.actions;
export default groupsSlice.reducer;
