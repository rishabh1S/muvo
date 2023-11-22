"use client";
import React, { KeyboardEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";

interface SearchProps {
  pathName: string;
  router: any;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<SearchProps> = ({
  pathName,
  router,
  searchQuery,
  setSearchQuery,
  setShowSearchBar,
}) => {
  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery && searchQuery.trim() !== "") {
      if (pathName.includes("/search"))
        router.replace(`/search/${searchQuery}`);
      else router.push(`/search/${searchQuery}`);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex justify-center items-center text-center">
      <div className="bg-[rgba(0,0,0,0.75)] border border-gray-300 px-4 items-center text-center flex rounded-full w-full mx-2">
        <div className="order-2 flex items-center flex-grow">
          <input
            name="search"
            value={searchQuery}
            onKeyUp={handleSubmit}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Movies, TV and Dramas..."
            className="bg-transparent text-[14px] font-medium px-4 py-2 placeholder:text-[14px] font-md text-white outline-none h-10 w-full sm:w-72 rounded-full focus:outline-none hover:cursor-pointer"
          />
          {searchQuery && (
            <IoCloseOutline
              onClick={handleClear}
              size={30}
              className="inline sm:w-6 sm-h-6 cursor-pointer text-gray-200 mx-2"
            />
          )}
        </div>
        <AiOutlineSearch
          onClick={() => setShowSearchBar(false)}
          className="inline sm:w-6 sm:h-6 cursor-pointer text-gray-200 mx-2.5"
        />
      </div>
    </div>
  );
};

export default SearchBar;
