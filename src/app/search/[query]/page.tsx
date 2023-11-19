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
            <div
              key={media.id}
              className="relative  overflow-hidden bg-cover bg-no-repeat group"
            >
              <img
                onClick={() =>
                  redirectToWatch(media.mediaType, media.id.toString())
                }
                src={`${baseUrl}/${media?.backdrop_path || media?.poster_path}`}
                alt="Media"
                draggable={false}
                className="
        cursor-pointer transition duration-300 ease-in-out group-hover:scale-110 w-full h-full
      "
              />
              <div className="opacity-0 absolute top-20 transform w-full group-hover:opacity-100">
                <div className="z-10 bg-zinc-900/90 p-2 lg:p-4 absolute w-full transition shadow-md">
                  <div className="flex flex-row items-center gap-3">
                    <div
                      onClick={() =>
                        redirectToWatch(media.mediaType, media.id.toString())
                      }
                      className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
                    >
                      <BsFillPlayFill
                        size={30}
                        className="text-black w-4 lg:w-6"
                      />
                    </div>
                    <FavoriteButton
                      mediaType={media.mediaType}
                      mediaId={media.id.toString()}
                    />
                    <div
                      onClick={() =>
                        openModal(media.mediaType, media.id.toString())
                      }
                      className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
                    >
                      <BsChevronDown
                        size={20}
                        className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6"
                      />
                    </div>
                  </div>
                  <p className="mt-4 text-white text-[12px] lg:text-2xl">
                    {(media.title || media.name) &&
                      (media.title || media.name)
                        .split(" ")
                        .slice(0, 4)
                        .join(" ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
