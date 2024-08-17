import React from "react";
import { AppBar, Toolbar, Typography, Button, Paper } from "@mui/material";
import ActionBtns from "../sideBars/topPanel/ActionBtns";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export default function MainAppBar() {

  const {pageTitle} = useSelector((state: RootState) => state.topPanel);
  return (
    <div className="flex w-full">
      <AppBar
        position="static"
        sx={{
          minHeight: "50px",
          backgroundColor: "transparent",
          height: "45px",
        }}
      >
        <Paper elevation={1} sx={{height:"45px"}}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
              {pageTitle}
            </Typography>
            <ActionBtns />
          </Toolbar>
        </Paper>
      </AppBar>
    </div>
  );
}
