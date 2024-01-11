"use client";
import { baseUrl } from "@/public/utils";
import {
  CircleLoader,
  CircleRating,
  FavoriteButton,
  Footer,
  Navbar,
  MediaList,
} from "@/src/components";
import { useMedia, useSimilar } from "@/src/hooks";
import { Genre } from "@/src/types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { RiMovie2Line } from "react-icons/ri";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
const Season = () => {
  const session = useSession();
  const router = useRouter();
  const params = useParams() as { mediaId: string; season: string };
  const { mediaId, season } = params;
  const mediaType = "tv";
  const { data, isLoading } = useMedia(mediaType, mediaId);
  const { data: mediaSimilar } = useSimilar(mediaType, mediaId);
  const seasonInfo = data?.seasons.find(
    (s: { season_number: number }) => s.season_number === Number(season)
  );
  const isComingSoon = seasonInfo?.episode_count === 0;

  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/auth");
    }
  }, [session?.status, router]);

  const handlePreviousSeason = () => {
    const previousSeason = Math.max(Number(season) - 1, 1);
    router.push(`/streamtv/${mediaId}/${previousSeason}`);
  };

  const handleNextSeason = () => {
    const nextSeason = Math.min(Number(season) + 1, data?.number_of_seasons);
    router.push(`/streamtv/${mediaId}/${nextSeason}`);
  };

  if (isLoading) {
    <CircleLoader />;
  }
  return (
    <div className="bg-body min-h-screen">
      <Navbar />
      <div className="sm:h-[400px] h-[300px] relative overflow-hidden">
        <nav className="flex items-start absolute sm:top-28 top-16 left-16 z-30">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                href="/series"
                className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-violet-600"
              >
                <IoMdHome size={18} />
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <FaChevronRight className="text-gray-400" />
                <Link
                  href={`/streamtv/${mediaId}`}
                  className="ms-1 text-sm font-medium text-gray-400 hover:text-violet-600 md:ms-2"
                >
                  Seasons
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <FaChevronRight className="text-gray-200" />
                <span className="ms-1 text-sm font-medium text-gray-200 md:ms-2">
                  Episode
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-transparent via-transparent to-body"></div>
        <img
          src={`${baseUrl}/${data?.backdrop_path}`}
          alt="data?.title"
          className="w-full h-auto"
        ></img>
      </div>
      <div className="max-w-7xl mx-auto p-4 flex flex-col gap-12">
        <div className="-mt-[180px] flex sm:flex-row flex-col items-center relative z-10">
          <img
            src={`${baseUrl}/${seasonInfo?.poster_path}`}
            alt="data?.title"
            className="sm:w-[200px] w-36 sm:h-[300px]"
          ></img>
          <div className="mx-auto flex flex-col items-center gap-3">
            <div className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold">
              {data?.name}
              <div className="flex items-end justify-center gap-4">
                {Number(season) > 1 && (
                  <IoChevronBack
                    size={30}
                    className="cursor-pointer text-white"
                    onClick={handlePreviousSeason}
                  />
                )}
                <span className="text-2xl md:text-3xl h-full lg:text-4xl font-semibold line-clamp-1 text-center">{` Season ${season}`}</span>
                {Number(season) < data?.number_of_seasons && (
                  <IoChevronForward
                    size={30}
                    className="cursor-pointer text-white"
                    onClick={handleNextSeason}
                  />
                )}
              </div>
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
              <span className="text-white">|</span>
              <p className="text-violet-500 sm:text-lg">
                {data?.genres?.map((genre: Genre) => genre.name).join(", ")}
              </p>
              <div className="sm:absolute right-0">
                {data?.id && (
                  <Link
                    href={`https://www.themoviedb.org/tv/${data?.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    <RiMovie2Line size={24} className="lg:hidden" />
                    <RiMovie2Line size={34} className="hidden lg:block" />
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {!isComingSoon ? (
                <Link
                  href={`/streamtv/${mediaId}/${season}/1`}
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
              <div className="sm:w-12 w-8 sm:h-12 h-8">
                <CircleRating rating={seasonInfo?.vote_average.toFixed(1)} />
              </div>
              <FavoriteButton mediaType="tv" mediaId={data?.id.toString()} />
            </div>
            <p className="text-white text-justify text-[14px] md:text-lg drop-shadow-xl px-4">
              {seasonInfo?.overview}
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {Array.from({ length: seasonInfo?.episode_count }, (_, index) => (
            <Link
              key={index + 1}
              href={`/streamtv/${mediaId}/${season}/${index + 1}`}
              passHref
              className="block p-4 border text-gray-200 border-gray-200 rounded shadow hover:bg-gray-200 hover:text-gray-900 transition duration-300 text-center"
            >
              Episode {index + 1}
            </Link>
          ))}
        </div>
      </div>
      <div className="pb-20">
        <MediaList
          title="Similar Tv shows"
          data={mediaSimilar}
          mediaType="tv"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Season;
