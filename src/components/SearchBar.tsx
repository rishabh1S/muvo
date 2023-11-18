"use client";
import React, { KeyboardEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";

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

  return (
    <div className="hidden md:flex justify-center items-center text-center">
      <div className="bg-[rgba(0,0,0,0.75)] border border-gray-300 px-4 items-center text-center flex rounded-full">
        <div className="order-2">
          <input
            name="search"
            value={searchQuery}
            onKeyUp={handleSubmit}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Movies, TV and Dramas..."
            className="bg-transparent text-[14px] font-medium px-4 py-2 placeholder:text-[14px] font-md text-white outline-none w-[210px] h-10 sm:w-80 pl-12 pr-3 rounded-full focus:outline-none hover:cursor-pointer"
          />
        </div>
        <button className="px-2.5">
          <AiOutlineSearch
            onClick={() => setShowSearchBar(false)}
            className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer text-gray-200"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
