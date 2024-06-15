import React from "react";
import { GiMagnifyingGlass } from "react-icons/gi";

interface SearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ query, setQuery }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="w-2/5 mx-auto relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-300 ease-in-out pl-10"
      />
      <GiMagnifyingGlass className="absolute top-1/2 left-4 text-xl transform -translate-y-1/2 text-gray-500" />
      {/* Add the magnifier icon */}
    </div>
  );
};

export default Search;
