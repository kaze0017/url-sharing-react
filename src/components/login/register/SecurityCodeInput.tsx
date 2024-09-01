import React, { ChangeEvent, useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../state/store";
import { setEmailCode } from "../../../state/loginAndRegister/registerSlice";

const SecurityCodeInput: React.FC = () => {
  const [values, setValues] = useState<string[]>(["", "", "", "", "", ""]);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue) && newValue.length <= 1) {
      const newValues = [...values];
      newValues[index] = newValue;
      setValues(newValues);

      // Automatically move to the next input if a digit is entered
      if (newValue && index < 5) {
        document.getElementById(`digit-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newValues = [...values];

      // If the current field is not empty, clear it
      if (newValues[index]) {
        newValues[index] = "";
        setValues(newValues);
      }
      // If the current field is empty, move focus to the previous field
      else if (index > 0) {
        document.getElementById(`digit-${index - 1}`)?.focus();
      }
    }
  };

  useEffect(() => {
    dispatch(setEmailCode(values.join("")));
  }, [values, dispatch]);

  return (
    <Grid container spacing={2} justifyContent="center">
      {values.map((value, index) => (
        <Grid item key={index}>
          <TextField
            id={`digit-${index}`}
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) =>
              handleKeyDown(e as React.KeyboardEvent<HTMLInputElement>, index)
            }
            inputProps={{
              maxLength: 1,
              style: { textAlign: "center", fontSize: "16px" },
            }}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0",
                borderBottom: "2px solid",
                borderColor: "black",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              width: "40px",
            }}
            size="small"
            
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SecurityCodeInput;
