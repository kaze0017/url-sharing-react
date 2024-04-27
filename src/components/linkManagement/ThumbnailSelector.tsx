import React, {  useState, useEffect } from "react";
import Slider from "./Slider";
import { thumbnails } from "../../lib/placeholder-data";
import { FiUploadCloud } from "react-icons/fi";

interface ThumbnailSelectorProps {
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}

export default function ThumbnailSelector({
  setSelectedImage,
}: ThumbnailSelectorProps) {
  const [filteredThumbnails, setFilteredThumbnails] = useState(thumbnails);
  const [searchTerm, setSearchTerm] = useState("");

  function alertForUpload() {
    alert("Upload feature not implemented yet 😊");
  }

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredThumbnails(thumbnails);
    } else {
      setFilteredThumbnails(
        thumbnails.filter((thumbnail) =>
          // check if any tag includes the search term
          thumbnail.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
    }
  }, [searchTerm]);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden p-2">
      <div className="w-full flex p-1 justify-between items-center">
        <p>Search for tags</p>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-2/3 p-2 border-b-2 border-gray-300 focus:outline-none "
        />
      </div>
      <Slider
        thumbnails={filteredThumbnails}
        setSelectedImage={setSelectedImage}
      />
      <div className="flex w-full justify-between items-center p-2 ">
        <p>Select from the gallery or upload a new one </p>
        <button onClick={alertForUpload}>
          <FiUploadCloud className="font-bold text-2xl" />
        </button>
      </div>
    </div>
  );
}
