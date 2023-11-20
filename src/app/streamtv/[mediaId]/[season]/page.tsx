"use client";
import { baseUrl } from "@/public/utils";
import { CircleLoader, Navbar } from "@/src/components";
import { useMovie } from "@/src/hooks";
import { Genre } from "@/src/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const Season = () => {
  const params = useParams() as { mediaId: string; season: string };
  const { mediaId, season } = params;
  const mediaType = "tv";
  const { data, isLoading } = useMovie(mediaType, mediaId);
  console.log(data);
  const episodeCount = data?.seasons.find(
    (s: { season_number: number }) => s.season_number === Number(season)
  )?.episode_count;

  if (isLoading) {
    <CircleLoader />;
  }
  return (
    <div className="bg-body min-h-screen">
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
            src={`${baseUrl}/${
              data?.seasons.find(
                (s: { season_number: number }) =>
                  s.season_number === Number(season)
              )?.poster_path
            }`}
            alt="data?.title"
            className="w-[200px] min-w-[200px] h-[300px] sm:mx-auto"
          ></img>
          <div className="mx-auto flex flex-col items-center gap-3">
            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
              {data?.name}
              <span>{` Season ${season}`}</span>
            </p>
            <ul className="flex items-center gap-3">
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
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: episodeCount }, (_, index) => (
            <Link
              key={index + 1}
              href={`/streamtv/${mediaId}/${season}/${index + 1}`}
              passHref
              className="block p-4 border text-gray-200 border-gray-200 rounded shadow hover:bg-gray-200 hover:text-gray-900 transition duration-300"
            >
              Episode {index + 1}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Season;
