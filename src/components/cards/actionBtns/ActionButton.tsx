import React from "react";
import { Button } from "@mui/material";
import { gray } from "d3";

interface ActionButtonProps {
  count: number;
  IconComponent: React.ElementType;
  isActive: boolean;
  onClick: (event: any) => void;
}

const ActionButton = ({
  count,
  IconComponent,
  isActive,
  onClick,
}: ActionButtonProps) => (
  <Button
    onClick={onClick}
    sx={{
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minWidth: "30px",
    }}
    color="inherit"
  >
    <p>{count}</p>
    <IconComponent
      className={isActive ? "text-blue-500" : ""}
      fontSize="small"
    />
  </Button>
);

export default ActionButton;
