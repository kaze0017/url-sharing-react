import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Box from "@mui/material/Box";
import {
  PassConditionsType,
  PassConditionType,
} from "../../../lib/interfaces/RegisterConditionsTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

interface RegisterFormConditionsProps {
  handleCloseBackdrop: () => void;
}

export default function RegisterFormConditions({
  handleCloseBackdrop,
}: RegisterFormConditionsProps) {
  const { emailConditions, passConditions } = useSelector(
    (state: RootState) => state.register
  );
  return (
    <Box padding={4}>
      <div className="flex flex-col gap-0 w-full">
        <Divider>
          <Typography variant="h6" color="primary">
            Email requirements
          </Typography>
        </Divider>
        <Typography
          variant="caption"
          color={emailConditions.valid ? "success" : "error"}
        >
          Email must be valid
        </Typography>
        <Typography variant="caption" color="primary">
          Example: example@example.com
        </Typography>
      </div>
      <div className="flex flex-col gap-0 w-full">
        <Divider>
          <Typography variant="h6" color="primary">
            Password requirements
          </Typography>
        </Divider>
        {Object.keys(passConditions as PassConditionsType).map((key) => {
          const condition = passConditions[
            key as keyof PassConditionsType
          ] as PassConditionType;
          return (
            <Typography
              variant="caption"
              color={condition.state ? "success" : "error"}
              key={key}
            >
              {condition.message}
            </Typography>
          );
        })}
      </div>
      <Button
        onClick={handleCloseBackdrop}
        color="primary"
        variant="contained"
        fullWidth
      >
        Close
      </Button>
    </Box>
  );
}
