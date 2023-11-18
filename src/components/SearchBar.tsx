import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  return (
    <div className="w-full p-2">
      <div className="relative">
        <div className="text-gray-700 hover:text-gray-500 cursor-pointer transition">
          <BsSearch className="absolute top-3 left-4" />
        </div>
        <input
          type="text"
          className="bg-gray-200 h-10 sm:w-80 pl-12 pr-3 rounded-full focus:outline-none hover:cursor-pointer"
          name=""
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
