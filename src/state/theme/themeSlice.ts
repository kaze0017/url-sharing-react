import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface ThemeState {
  theme: {
    palette: {
      mode: "light" | "dark";
      primary: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
    };
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: string;
            backdropFilter: string;
          };
        };
      };
    };
  };
}
const initialState: ThemeState = {
  theme: {
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2",
        light: "#42a5f5",
        dark: "#1565c0",
        contrastText: "#fff",
      },
      secondary: {
        main: "#9c27b0",
        light: "#ba68c8",
        dark: "#7b1fa2",
        contrastText: "#fff",
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 255, 255, 0.7)", // Default for light mode
            backdropFilter: "blur(10px)",
          },
        },
      },
    },
  },
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme.palette.mode = action.payload;
      const isDarkMode = action.payload === "dark";
      state.theme.components.MuiPaper.styleOverrides.root.backgroundColor =
        isDarkMode
          ? "rgba(0, 0, 0, 0.7)" // Dark mode color with opacity
          : "rgba(255, 255, 255, 0.7)"; // Light mode color with opacity
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.theme.palette.primary.main = action.payload;
    },
    setSecondaryColor: (state, action: PayloadAction<string>) => {
      state.theme.palette.secondary.main = action.payload;
    },
  },
});

export const { setMode, setPrimaryColor, setSecondaryColor } =
  themeSlice.actions;

export default themeSlice.reducer;
