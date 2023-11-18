"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Navbar, MovieCard } from "@/src/components";
import { getTVorMovieSearchResults } from "@/public/utils";

export default function Search() {
  const { data: session } = useSession();
  const params = useParams();

  return (
    <>
      <Navbar />
      <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
        {/* <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
              Showing Results for {decodeURI(params.query)}
          </h2> */}
        {/* <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
              {searchResults && searchResults.length
                  ? searchResults.map((searchItem) => (
                      <MovieCard
                          key={searchItem.id}
                          media={searchItem}
                          searchView={true} />
                  ))
                  : null}
          </div> */}
      </div>
    </>
  );
}
