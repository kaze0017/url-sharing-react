import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Search from "./Search";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ButtonGroup from "@mui/material/ButtonGroup";

interface ActionsProps {
  view: string;
  setView: () => void;
  query: string;
  setQuery: (query: string) => void;
}

export default function Actions({
    view, setView, query, setQuery
}: ActionsProps) {

  const drawerWidth = 240;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }} onClick={handleDrawerToggle}>
        <MenuOpenIcon color="primary" fontSize="large" />
      </Typography>
      <Divider />
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="Vertical button group"
        fullWidth
        variant="text"
      >
        <Button color="primary">Create</Button>
        <Button color="primary">Filter</Button>
        <Button color="primary">Type</Button>
        <Button color="primary">Time</Button>
        <Button
          startIcon={
            view === "grid" ? (
              <ViewQuiltIcon />
            ) : view === "cardImgIconS" ? (
              <ViewModuleIcon />
            ) : (
              <ViewListIcon />
            )
          }
          color="primary"
          onClick={() => setView()}
        >
          {view === "grid" ? "Grid" : view === "cardImgIconS" ? "Card" : "List"}
        </Button>
      </ButtonGroup>
    </Box>
  );

  return (
    <>
      <AppBar component="nav" color="transparent" position="relative">
        <Toolbar sx={{ marginRight: 2 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block", flexGrow: 1 } }}>
            <Button color="primary" sx={{ minWidth: 90 }}>
              Create
            </Button>
            <Button color="primary" sx={{ minWidth: 90 }}>
              Filter
            </Button>
            <Button color="primary" sx={{ minWidth: 90 }}>
              Type
            </Button>
            <Button color="primary" sx={{ minWidth: 90 }}>
              Time
            </Button>
            <Button
              startIcon={
                view === "grid" ? (
                  <ViewQuiltIcon />
                ) : view === "cardImgIconS" ? (
                  <ViewModuleIcon />
                ) : (
                  <ViewListIcon />
                )
              }
              color="primary"
              onClick={() => setView()}
              size="large"
              sx={{ minWidth: 90 }}
            >
              {view === "grid"
                ? "Grid"
                : view === "cardImgIconS"
                ? "Card"
                : "List"}
            </Button>
          </Box>
          <Search
            query={query}
            setQuery={(query) => setQuery(query)}
          />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}
