"use client";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import { useEpisode, useMedia } from "@/src/hooks";
import { baseUrl, embedTvShowUrl } from "@/public/utils";
import { Episode } from "@/src/types";
import {
  CircleLoader,
  CircleRating,
  FavoriteButton,
  VideoEmbedding,
} from "@/src/components";
import Link from "next/link";
import { RiMovie2Line } from "react-icons/ri";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { MdInfoOutline } from "react-icons/md";
import { toast } from "sonner";

const Episode = () => {
  const router = useRouter();
  const params = useParams() as {
    mediaId: string;
    season: string;
    episode: string;
  };
  const { mediaId, season, episode } = params;
  const mediaType = "tv";
  const { data, isLoading } = useMedia(mediaType, mediaId);
  const { data: episodeDetails } = useEpisode(mediaId, season);
  const episodeInfo = episodeDetails?.episodes[episode];
  const seasonInfo = data?.seasons.find(
    (s: { season_number: number }) => s.season_number === Number(season)
  );
  const episodeURL = `${embedTvShowUrl}${mediaId}&s=${season}&e=${episode}`;
  const episodeCount = data?.seasons.find(
    (s: { season_number: number }) => s.season_number === Number(season)
  )?.episode_count;

  const goToPreviousEpisode = () => {
    const previousEpisode = Math.max(Number(episode) - 1, 1);
    router.push(`/streamtv/${mediaId}/${season}/${previousEpisode}`);
  };

  const goToNextEpisode = () => {
    const nextEpisode = Math.min(Number(episode) + 1, episodeCount);
    router.push(`/streamtv/${mediaId}/${season}/${nextEpisode}`);
  };

  if (isLoading) {
    return <CircleLoader />;
  }
  return (
    <div className="relative min-h-screen">
      <nav className="w-full fixed z-40">
        <div className="sm:p-6 p-4 flex items-center justify-between gap-8 bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="flex gap-4">
            <AiOutlineArrowLeft
              size={36}
              onClick={() => router.push(`/streamtv/${mediaId}`)}
              className="w-6 md:w-10 text-white cursor-pointer transition-transform transform hover:opacity-80 hover:-translate-x-2 duration-300"
            />
            <div className="text-white text-1xl md:text-3xl">
              <span className="font-light">Watching:</span>{" "}
              {data?.title || data?.name}
              {` Season ${season}`}
              {` Episode ${episode}`}
            </div>
          </div>
          <div className="flex gap-4">
            {Number(episode) > 1 && (
              <div
                className="block border text-gray-200 border-gray-200 shadow-lg hover:bg-gray-200 hover:text-gray-900 transition duration-300 font-bold sm:py-2 sm:px-4 py-1 px-2 rounded cursor-pointer"
                onClick={goToPreviousEpisode}
              >
                Previous Episode
              </div>
            )}
            {Number(episode) < episodeCount && (
              <div
                className="block border text-gray-200 border-gray-200 shadow-lg hover:bg-gray-200 hover:text-gray-900 transition duration-300 font-bold sm:py-2 sm:px-4 py-1 px-2 rounded cursor-pointer"
                onClick={goToNextEpisode}
              >
                Next Episode
              </div>
            )}
          </div>
        </div>
      </nav>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${baseUrl}/${data?.backdrop_path})`,
          filter: "blur(14px)",
        }}
      />
      <div className="relative z-10 pt-20">
        <div className="grid grid-cols-1 grid-rows-4 gap-4 lg:grid-cols-7 lg:grid-rows-5 sm:px-8 px-2 py-4">
          <div className="lg:col-span-5 lg:row-span-5 row-span-4 flex lg:flex-row flex-col-reverse">
            <div className="lg:w-1/4 bg-zinc-950">
              <div className="text-white p-4 text-sm font-medium">
                List of Episodes:
              </div>
              <ul className="overflow-y-auto max-h-screen">
                {episodeDetails?.episodes.map((e: Episode) => (
                  <Link
                    key={e.id}
                    href={`/streamtv/${mediaId}/${season}/${e.episode_number}`}
                    passHref
                  >
                    <li
                      className={`p-2 cursor-pointer ${
                        Number(episode) === e.episode_number
                          ? "border-l-4 border-[#8dc53e] text-[#8dc53e]"
                          : "text-white"
                      }
                        ${
                          (e.episode_number + 1) % 2 === 0
                            ? "bg-[#1E1F21] hover:bg-zinc-700"
                            : "bg-[#121315] hover:bg-zinc-700"
                        }`}
                      title={e.name}
                    >
                      <div className="flex items-center">
                        <span className="pr-4 font-semibold">
                          {e.episode_number}
                        </span>
                        <span className="font-light overflow-hidden overflow-ellipsis whitespace-nowrap">
                          {e.name}
                        </span>
                        {Number(episode) === e.episode_number && (
                          <span className="ml-auto">
                            <FaRegCirclePlay size={22} />
                          </span>
                        )}
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className="lg:w-3/4 flex flex-col bg-[#060002] text-white">
              <div>
                <VideoEmbedding embedURL={episodeURL} />
              </div>
              <div className="p-2 text-center">
                You are watching{" "}
                <span className="font-bold">{` Episode ${episode}`}</span>.
                <div className="font-thin">
                  If current server doesn&apos;t work please try other servers
                  by clicking on cloud icon.
                </div>
              </div>
              <div className="p-4 rounded-lg shadow-lg">
                <div className="text-white font-semibold text-xl mb-2">
                  More about this episode
                </div>
                <div className="text-gray-400 flex justify-between">
                  <span className="text-sm">
                    {new Date(episodeInfo?.air_date).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                  <span className="text-sm">{episodeInfo?.runtime}m</span>
                </div>
                <p className="text-gray-300 text-sm mt-3 text-justify">
                  {episodeInfo?.overview}
                </p>
              </div>

              <div className="p-4 font-semibold text-lg">
                Watch more seasons of this show
                <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 py-4">
                  {data?.seasons.map(
                    (
                      s: {
                        name: string;
                        poster_path: string | null;
                        season_number: number;
                      },
                      i: number
                    ) => (
                      <button
                        key={i}
                        className={`relative w-full h-20 bg-cover bg-center rounded-md ${
                          s.season_number === Number(season)
                            ? "border-[3px] border-[#8dc53e]"
                            : ""
                        }`}
                        style={{
                          backgroundImage: `url(${baseUrl}/${
                            s?.poster_path || data?.backdrop_path
                          })`,
                        }}
                        onClick={() =>
                          router.push(
                            `/streamtv/${data.id}/${s.season_number}/1`
                          )
                        }
                      >
                        <div className="absolute top-0 left-0 w-full h-full dotfilter z-10" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 transition duration-300 opacity-0 hover:opacity-100 z-20">
                          <div className="text-white font-bold text-center">
                            {s.name}
                          </div>
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-5 lg:col-start-6 row-start-5">
            <div className="flex flex-col sm:items-start items-center gap-3 drop-shadow-lg">
              <img
                src={`${baseUrl}/${seasonInfo?.poster_path}`}
                alt="data?.title"
                className="w-36 h-60"
              />
              <div className="text-white text-xl md:text-2xl lg:text-3xl font-bold">
                {data?.name}
              </div>
              <div className="flex items-center sm:gap-3 gap-1">
                <p className="text-white font-semibold text-lg">
                  {seasonInfo && seasonInfo.air_date
                    ? new Date(seasonInfo?.air_date).getFullYear()
                    : ""}
                </p>
                <span className="text-white">|</span>
                <p className="text-white sm:text-lg">
                  {seasonInfo && seasonInfo.episode_count
                    ? `${seasonInfo?.episode_count} Episodes`
                    : ""}
                </p>
                <div className="w-10">
                  <CircleRating rating={seasonInfo?.vote_average.toFixed(1)} />
                </div>
                <FavoriteButton mediaType="tv" mediaId={data?.id.toString()} />
                <div>
                  {data?.id && (
                    <Link
                      href={`https://www.themoviedb.org/tv/${data?.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      <RiMovie2Line size={24} className="lg:hidden" />
                      <RiMovie2Line size={42} className="hidden lg:block" />
                    </Link>
                  )}
                </div>
              </div>
              <div className="text-white drop-shadow-xl text-justify">
                {seasonInfo?.overview || data?.overview}
              </div>
            </div>
            <div className="flex sm:justify-start justify-center gap-4">
              <button
                type="button"
                onClick={() => router.push(`/streamtv/${mediaId}`)}
                className="text-white bg-[#050708]/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex gap-2 items-center hover:bg-[#050708] my-3"
              >
                View Details <MdInfoOutline size={22} />
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("URL copied to clipboard!");
                }}
                className="text-white bg-[#8dc53e]/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex gap-2 items-center hover:bg-[#8dc53e] my-3"
              >
                Share <IoIosShareAlt size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episode;
