import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { Button, Input, Box, Typography } from "@mui/material";
import {
  setMode,
  setPrimaryColor,
  setSecondaryColor,
} from "../../../state/theme/themeSlice";

export default function ThemeAndAppearance() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);

  const handleChangeTheme = (mode: "light" | "dark") => {
    dispatch(setMode(mode));
  };

  const handleColorChange = (
    colorType: "primary" | "secondary",
    colorValue: string
  ) => {
    colorType === "primary"
      ? dispatch(setPrimaryColor(colorValue))
      : dispatch(setSecondaryColor(colorValue));
  };

  return (
    <Box>
      <Button
        onClick={() => handleChangeTheme("light")}
        variant="contained"
        color="primary"
      >
        Light Theme
      </Button>
      <Button
        onClick={() => handleChangeTheme("dark")}
        variant="contained"
        color="secondary"
      >
        Dark Theme
      </Button>

      <Box display="flex" alignItems="center" mt={2}>
        <Typography variant="body1" mr={1}>
          Primary Color:
        </Typography>
        <Input
          type="color"
          onChange={(e) => handleColorChange("primary", e.target.value)}
          sx={{ width: "20px", height: "20px", margin: "0 8px" }}
          value={theme.palette.primary.main}
          aria-label="Primary Color Picker"
        />
      </Box>

      <Box display="flex" alignItems="center" mt={2}>
        <Typography variant="body1" mr={1}>
          Secondary Color:
        </Typography>
        <Input
          type="color"
          onChange={(e) => handleColorChange("secondary", e.target.value)}
          sx={{ width: "20px", height: "20px", margin: "0 8px" }}
          value={theme.palette.secondary.main}
          aria-label="Secondary Color Picker"
        />
      </Box>
    </Box>
  );
}