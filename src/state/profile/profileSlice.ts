import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserProfileType } from "../../lib/interfaces";
import { getUserInfoById } from "../../api/gets/getUserInfoById";
import { SharedLinkType } from "../../lib/interfaces";

export const getUserInfo = createAsyncThunk(
  "profile/getUserInfo",
  async (userId: string, { getState }) => {
    const response = await getUserInfoById({
      userId: userId,
      token: (getState() as { auth: { token: string } }).auth.token,
    });
    return response;
  }
);

interface ProfileState {
  userInfo: UserProfileType;
  query: string;
  mode: "saved" | "public" | "trend";
  sortBy: "rank" | "shared" | "saved";
  view: "cardImgIconS" | "cardSharedLg" | "grid";
  toggledTopPanel: boolean;
  links: SharedLinkType[];
  linksToDisplay: SharedLinkType[];
}

const initialState: ProfileState = {
  userInfo: {
    user_id: 0,
    email: "",
    first_name: "",
    last_name: "",
    tags: [],
    categories: [],
  },
  query: "",
  view: "grid",
  mode: "saved",
  sortBy: "rank",
  toggledTopPanel: false,
  links: [],
  linksToDisplay: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserProfileType>) => {
      state.userInfo = action.payload;
    },

    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.linksToDisplay = state.links.filter((link) => {
        return link.title.toLowerCase().includes(action.payload.toLowerCase());
      });
    },

    setView: (state) => {
      switch (state.view) {
        case "cardImgIconS":
          state.view = "cardSharedLg";
          break;
        case "cardSharedLg":
          state.view = "grid";
          break;
        case "grid":
          state.view = "cardImgIconS";
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload.user_info;
      const links = action.payload.public_links.map((link: SharedLinkType) => {
        link.owner = action.payload.user_info;
        return link;
      });
      state.links = links;
      state.linksToDisplay = links;
    });
  },
});

export const { setUserInfo, setQuery, setView } = profileSlice.actions;
export default profileSlice.reducer;
