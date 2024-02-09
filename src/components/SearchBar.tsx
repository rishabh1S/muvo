"use client";
import React, { useEffect, useState, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { baseUrl, getTVorMovieSearchResults } from "@/public/utils";
interface SearchResult {
  id: number;
  name: string;
  title: string;
  poster_path: string;
  media_type: string;
  first_air_date: string;
  release_date: string;
}
interface SearchProps {
  router: any;
  setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<SearchProps> = ({ router, setShowSearchBar }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const resultsContainerRef = useRef<HTMLDivElement | null>(null);

  const handleClear = () => {
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleInputChange = async (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setShowSearchResults(false);
      setSearchResults([]);
      return;
    }

    try {
      const [movieResults, tvResults] = await Promise.all([
        getTVorMovieSearchResults("movie", query),
        getTVorMovieSearchResults("tv", query),
      ]);
      const combinedResults = [
        ...movieResults.map((result: SearchResult) => ({
          ...result,
          media_type: "movie",
        })),
        ...tvResults.map((result: SearchResult) => ({
          ...result,
          media_type: "tv",
        })),
      ];
      const sortedResults = combinedResults.sort(
        (a, b) => b.popularity - a.popularity
      );
      setSearchResults(sortedResults);
      setShowSearchResults(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      handleInputChange(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        resultsContainerRef.current &&
        !resultsContainerRef.current.contains(e.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleResultClick = (id: number, media_type: string) => {
    if (media_type === "movie") {
      router.push(`/movies/${id}`);
    } else if (media_type === "tv") {
      router.push(`/shows/${id}`);
    }
  };

  return (
    <div className="relative flex justify-center items-center text-center sm:px-0 px-2">
      <div className="bg-neutral-950/70 border border-gray-300 px-4 items-center text-center flex rounded-full w-full mx-2">
        <div className="order-2 flex items-center flex-grow">
          <input
            name="search"
            value={searchQuery}
            onKeyUp={(e) => {
              if (e.key === "Enter" && searchQuery.trim() !== "") {
                router.push(`/search/${searchQuery}`);
              }
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
            placeholder="Search Movies, TV and Dramas..."
            className="bg-transparent text-[14px] font-medium px-2 py-2 placeholder:text-[14px] font-md text-white outline-none h-10 w-full sm:w-72 rounded-full focus:outline-none hover:cursor-pointer"
          />
          {searchQuery && (
            <IoCloseOutline
              onClick={handleClear}
              size={24}
              className="inline sm:w-6 sm:h-6 cursor-pointer text-gray-200 mx-2"
            />
          )}
        </div>
        <AiOutlineSearch
          size={24}
          className="inline sm:w-6 sm:h-6 cursor-pointer text-neutral-200 mx-2"
        />
      </div>
      <div
        onClick={() => setShowSearchBar(false)}
        className="text-white hover:text-lime-500 px-2 text-sm cursor-pointer"
      >
        Cancel
      </div>
      {showSearchResults && searchQuery.trim() !== "" && (
        <div
          ref={resultsContainerRef}
          className="absolute top-11 bg-neutral-950/70 w-full rounded-md overflow-y-auto sm:max-h-[60vh] max-h-[100vh]"
        >
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="flex items-center gap-4 cursor-pointer py-3 px-4 hover:bg-neutral-950"
              onClick={() => handleResultClick(result.id, result.media_type)}
            >
              <img
                src={
                  result.poster_path
                    ? `${baseUrl}${result.poster_path}`
                    : "/images/no-poster.png"
                }
                alt={`${result.name} Poster`}
                className="w-10 h-14"
              />
              <div className="flex items-center justify-between w-full sm:text-base text-sm">
                <div className="text-white text-start w-3/5">
                  {result.name || result.title}
                </div>
                <div className="text-neutral-400 w-2/5">
                  {result.first_air_date || result.release_date
                    ? new Date(
                        result.first_air_date || result.release_date
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
