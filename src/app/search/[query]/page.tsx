"use client";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useReducer, useState } from "react";
import { Navbar, InfoModal, MovieCard, FavoriteButton } from "@/src/components";
import { baseUrl, getTVorMovieSearchResults } from "@/public/utils";
import { useInfoModal } from "@/src/hooks";
import { MovieInterface } from "@/src/types";
import { BsChevronDown, BsFillPlayFill } from "react-icons/bs";

export default function Search() {
  const [searchResults, setSearchResults] = useState<MovieInterface[]>([]);
  const { isOpen, closeModal } = useInfoModal();
  const router = useRouter();
  const params = useParams();
  const mediaName = params!.query as string;
  const { openModal } = useInfoModal();
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
    }

    getSearchResults();
  }, [mediaName]);

  const redirectToWatch = useCallback(
    (mediaType: string, mediaId: string) => {
      mediaType === "tv"
        ? router.push(`/streamtv/${mediaId}`)
        : router.push(`/streammovie/${mediaId}`);
    },
    [router]
  );

  return (
    <div className="absolute">
      <Navbar />
      <InfoModal visible={isOpen} onClose={closeModal} />
      <div className="px-4 md:px-12 mt-4 space-y-8 py-28">
        <h2 className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          Showing Results for{" "}
          <span className="text-violet-500 font-bold">
            {decodeURIComponent(mediaName)}
          </span>
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {searchResults.map((media) => (
            <MovieCard
              key={media.id}
              mediaType={media.mediaType}
              data={media}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
