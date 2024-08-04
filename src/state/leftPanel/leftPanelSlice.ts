import { createSlice } from "@reduxjs/toolkit";

interface LeftPanelState {
  title: string;
  toggled: boolean;
}


const initialState: LeftPanelState = {
  title: "Search",
  toggled: false,
};


const leftPanelSlice = createSlice({
  name: "leftPanel",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setToggled: (state, action) => {
      state.toggled = action.payload;
    },
  },
});


export const { setTitle, setToggled } = leftPanelSlice.actions;
export default leftPanelSlice.reducer;

