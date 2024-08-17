import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

export default function Create() {
  const navigate = useNavigate();

  function handleCreateLink() {
    navigate("/linkmanagement/createlink");
  }


  function handleCreateCategory() {
    navigate("/linkmanagement/createCategory");
    console.log("Add to category");
  }
  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  return (
    <div>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        startIcon={<AddOutlinedIcon />}
      >
        Create
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 50 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                {/* <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{
                    opacity: 1,
                    zIndex: 1,
                  }}
                >
                  <MenuItem onClick={handleCreateLink}
                    
                  >Link</MenuItem>
                  <MenuItem onClick={handleCreateCategory}>Category</MenuItem>
                </MenuList> */}
                <List>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleCreateLink}>
                      <ListItemIcon
                        sx={{
                          minWidth: "35px",
                        }}
                      >
                        <LinkOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Link" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleCreateCategory}>
                      <ListItemIcon
                        sx={{
                          minWidth: "35px",
                        }}
                      >
                        <CategoryOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Category" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
