"use client";
import {
  CircleLoader,
  FavoriteButton,
  Navbar,
  PlayButton,
} from "@/src/components";
import { useMovie } from "@/src/hooks";
import { useParams } from "next/navigation";
import React from "react";
import { Genre } from "@/src/types";
import Link from "next/link";
import { baseUrl, baseYoutubeUrl } from "@/public/utils";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { BsFillPlayFill } from "react-icons/bs";
import { RiMovie2Line } from "react-icons/ri";
import { SiImdb } from "react-icons/si";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 720 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 720, min: 0 },
    items: 2,
  },
};

const MovieSelection = () => {
  const params = useParams() as { mediaId: string };
  const { mediaId } = params;
  const mediaType = "movie";
  const { data, isLoading } = useMovie(mediaType, mediaId);
  console.log(data);
  const isComingSoon = new Date(data?.release_date) > new Date();
  const key =
    data?.videos?.results.find(
      (video: { type: string }) => video.type === "Trailer"
    )?.key || data?.videos?.results[0]?.key;

  if (isLoading) {
    return <CircleLoader />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="h-[300px] relative overflow-hidden">
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-transparent via-transparent to-body"></div>
        <img
          src={`${baseUrl}/${data?.backdrop_path}`}
          alt="data?.title"
          className="rounded-none"
        ></img>
      </div>
      <div className="max-w-7xl mx-auto p-4 flex flex-col gap-12">
        <div className="-mt-[150px] flex items-center relative z-10">
          <img
            src={`${baseUrl}/${data?.poster_path}`}
            alt="data?.title"
            draggable={false}
            className="w-[200px] min-w-[200px] h-[300px] sm:mx-auto"
          ></img>
          <div className="mx-auto flex flex-col items-center gap-3">
            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold">
              {data?.title || data?.original_title}
            </p>
            <p className="text-green-400 font-semibold text-lg">
              {new Date(data?.release_date).getFullYear() ===
              new Date().getFullYear() ? (
                <>
                  New{" "}
                  <span className="text-white">
                    {new Date(
                      data?.release_date || data?.first_air_date
                    ).getFullYear()}
                  </span>
                </>
              ) : (
                <span className="text-white">
                  {new Date(
                    data?.release_date || data?.first_air_date
                  ).getFullYear()}
                </span>
              )}
            </p>
            <div className="flex items-center gap-8">
              {!isComingSoon ? (
                <Link
                  href={`/streammovie/${mediaId}/watch`}
                  passHref
                  className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition text-black"
                >
                  <BsFillPlayFill
                    size={24}
                    className="w-4 md:w-7 text-black mr-1"
                  />
                  Watch Now
                </Link>
              ) : (
                <p className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition text-black pointer-events-none">
                  Coming Soon
                </p>
              )}
              <Link
                href={`${baseYoutubeUrl}${key}`}
                target="_blank"
                passHref
                className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition text-black"
              >
                <BsFillPlayFill
                  size={24}
                  className="w-4 md:w-7 text-black mr-1"
                />
                Play Trailer
              </Link>
              <FavoriteButton mediaType="movie" mediaId={data?.id} />
              <div className="flex items-center sm:absolute right-0">
                {data?.imdb_id && (
                  <Link
                    href={`https://www.imdb.com/title/${data.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-500 mx-2"
                  >
                    <SiImdb size={30} />
                  </Link>
                )}
                {data?.id && (
                  <Link
                    href={`https://www.themoviedb.org/movie/${data?.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    <RiMovie2Line size={36} />
                  </Link>
                )}
              </div>
            </div>
            <ul className="mt-6 flex items-center gap-3">
              {data?.genres?.map((genre: Genre) => (
                <li
                  key={genre.id}
                  className="px-4 py-2 bg-primary text-gray-200 rounded-lg text-sm"
                >
                  {genre.name}
                </li>
              ))}
            </ul>
            <p className="text-white text-[8px] md:text-lg drop-shadow-xl w-[90%] ">
              {data?.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSelection;
