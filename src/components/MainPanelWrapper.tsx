import React from "react";
import Paper from "@mui/material/Paper";

interface FeedPanelProps {
  children: React.ReactNode;
}

export default function MainPanelWrapper({ children }: FeedPanelProps) {
  const mainWrapperClass =
    "h-full w-full flex flex-col gap-1  overflow-hidden p-1";

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        padding: 1,
      }}
    >
      {children}
    </Paper>
  );
}
