import React, { useState } from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";

interface TagsSelectorProps {
  tagsOptionList?: string[];
  setSelectedTags: (value: string[]) => void;
  selectedTags: string[];
}

export default function TagsSelector({
  tagsOptionList,
  setSelectedTags,
  selectedTags,
}: TagsSelectorProps) {
  const [tags, setTags] = useState(["JavaScript", "React", "Material UI"]);

  const handleTagsChange = (event: any, value: any) => {
    setSelectedTags(value);
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      fullWidth
      options={tagsOptionList || tags}
      value={selectedTags}
      onChange={handleTagsChange}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Select or Add Tags"
          placeholder="Add new tag"
        />
      )}
      onInputChange={(event, newInputValue) => {
        if (newInputValue && !tags.includes(newInputValue)) {
          setTags([...tags, newInputValue]);
        }
      }}
      sx={{ backgroundColor: "white", borderRadius: "5px" }}
    />
  );
}
