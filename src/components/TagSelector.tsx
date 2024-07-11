import { useEffect, useState } from "react";
import FadeInOut from "./login/FadeInOut";
import { IoIosClose } from "react-icons/io";

interface TagSelectorProps {
  selectedTags: string[] 
  setSelectedTags:
    | React.Dispatch<React.SetStateAction<string[]>>
    | ((tags:string[]) => void);
  editMode?: boolean;
  inSuggestions?: string[];
}

export default function TagSelector({
  setSelectedTags,
  selectedTags,
  editMode = true,
  inSuggestions,
}: TagSelectorProps) {
  const MaxTag = 5;
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const suggestions = inSuggestions || ["No Suggestions"];
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  function removeTheTag(tag: string) {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  }

  function addTheTag(tag: string) {
    //add if not already exists
    if (selectedTags.length >= MaxTag) {
      setShowWarning(true);
      setInputValue("");
      setFilteredSuggestions([]);
      return;
    }
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      console.log(tag);
      console.log(selectedTags);
    }
    setInputValue("");
  }

  function handelChange(value: string) {
    if (value === "") {
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions(
        suggestions.filter((tag) =>
          tag.toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    setInputValue(value);
  }
  useEffect(() => {
    if (showWarning) {
      const timeout = setTimeout(() => {
        setShowWarning(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showWarning]);
  return (
    <div className="relative flex flex-col w-full">
      <FadeInOut show={selectedTags.length > 0} duration={400}>
        <div className="flex flex-wrap gap-1 w-full bg-gray-200 p-1">
          {selectedTags.map((tag, index) => (
            <div
              key={index}
              className="border rounded-xl bg-gray-800 text-white flex items-center justify-center gap-1 px-2 uppercase text-2xs"
            >
              {tag}{" "}
              <button onClick={() => removeTheTag(tag)}>
                <IoIosClose className="text-white text-lg" />
              </button>
            </div>
          ))}
        </div>
      </FadeInOut>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handelChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            addTheTag(inputValue.trim());
          }
        }}
        className="text-xs w-full"
        placeholder="Add tags..."
        readOnly={!editMode}
        style={!editMode ? { display: "none" } : {}}
        name="tags"
      />

      <FadeInOut show={showWarning} duration={1000}>
        <div className="w-full">
          <p className="text-red-500 text-2xs">Max {MaxTag} tags allowed</p>
        </div>
      </FadeInOut>
      {/* Display filtered suggestions */}
      {inputValue && (
        <div className="absolute top-full max-h-24 overflow-auto scrollbar-hide flex flex-col  left-0 w-full bg-white border border-gray-300 rounded-md z-10 mt-1">
          {/* Display filtered suggestions */}
          {filteredSuggestions.map((tag, index) => (
            <div
              key={index}
              className="hover:bg-gray-100 p-1 cursor-pointer text-2xs max-h-8 "
              onClick={() => addTheTag(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
