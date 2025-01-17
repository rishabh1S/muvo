"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Navbar,
  InfoModal,
  SkeletonLoader,
  Footer,
  MediaSection,
} from "@/src/components";
import { getTVorMovieSearchResults } from "@/src/utils";
import { useInfoModal } from "@/src/hooks";
import { MediaInterface } from "@/src/types";
import Image from "next/image";

export default function Search() {
  const [searchResults, setSearchResults] = useState<MediaInterface[]>([]);
  const { isOpen, closeModal } = useInfoModal();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const mediaName = params!.query as string;

  useEffect(() => {
    async function getSearchResults() {
      const tvShows = await getTVorMovieSearchResults("tv", mediaName);
      const movies = await getTVorMovieSearchResults("movie", mediaName);

      const filteredTVShows = tvShows
        .filter(
          (item: { backdrop_path: null; poster_path: null }) =>
            item.backdrop_path !== null && item.poster_path !== null
        )
        .map((tvShowItem: any) => ({ ...tvShowItem, mediaType: "tv" }));

      const filteredMovies = movies
        .filter(
          (item: { backdrop_path: null; poster_path: null }) =>
            item.backdrop_path !== null && item.poster_path !== null
        )
        .map((movieItem: any) => ({ ...movieItem, mediaType: "movie" }));

      setSearchResults([...filteredTVShows, ...filteredMovies]);
      setIsLoading(false);
    }

    getSearchResults();
  }, [mediaName]);

  return (
    <>
      <Navbar />
      <InfoModal visible={isOpen} onClose={closeModal} />
      <div className="px-4 md:px-12 space-y-8 py-28 min-h-screen">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            {searchResults.length === 0 ? (
              <>
                <p className="text-white text-2xl md:text-3xl font-bold mb-4">
                  No Results found for{" "}
                  <span className="text-violet-500 font-bold">
                    {decodeURIComponent(mediaName)}
                  </span>
                </p>
                <Image
                  src="/images/no-results.png"
                  alt="No Results"
                  width={500}
                  height={500}
                />
              </>
            ) : (
              <>
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
                  Showing Results for{" "}
                  <span className="text-violet-500 font-bold">
                    {decodeURIComponent(mediaName)}
                  </span>
                </h2>
                <MediaSection mediaData={searchResults} />
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
