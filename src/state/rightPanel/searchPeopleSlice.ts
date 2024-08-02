import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserProfileType } from "../../lib/interfaces";
import { getUserByQuery } from "../../api/gets/getUserByQuery";

export const searchPeople = createAsyncThunk(
  "searchPeople/searchPeople",
  async (_, { getState, dispatch }) => {
    const state = getState() as { auth: { token: string } , searchPeople: { searchPeopleQuery: string } };
    const response = await getUserByQuery(state.auth.token, state.searchPeople.searchPeopleQuery);
    dispatch(setSearchPeopleResults(response));
    return response;
  }
);


interface SearchPeopleState {
  searchPeople: boolean;
  searchPeopleResults: UserProfileType[];
  searchPeopleQuery: string;
}

const initialState: SearchPeopleState = {
  searchPeople: false,
  searchPeopleResults: [],
  searchPeopleQuery: "",
};

const searchPeopleSlice = createSlice({
  name: "searchPeople",
  initialState,
  reducers: {
    setSearchPeople: (state, action: PayloadAction<boolean>) => {
      state.searchPeople = action.payload;
    },
    setSearchPeopleResults: (state, action: PayloadAction<UserProfileType[]>) => {
      state.searchPeopleResults = action.payload;
    },
    setSearchPeopleQuery: (state, action: PayloadAction<string>) => {
      state.searchPeopleQuery = action.payload;
    },
  },
});

export const {
  setSearchPeople,
  setSearchPeopleResults,
  setSearchPeopleQuery,
} = searchPeopleSlice.actions;

export default searchPeopleSlice.reducer;