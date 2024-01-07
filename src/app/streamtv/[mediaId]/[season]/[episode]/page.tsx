"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import { useMovie } from "@/src/hooks";
import { embedTvShowUrl } from "@/public/utils";
import { CircleLoader, VideoEmbedding } from "@/src/components";
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
  const { data, isLoading } = useMovie(mediaType, mediaId);
  const episodeURL = `${embedTvShowUrl}${mediaId}&s=${season}&e=${episode}`;
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const episodeCount = data?.seasons.find(
    (s: { season_number: number }) => s.season_number === Number(season)
  )?.episode_count;

  const showNavbar = useCallback(() => {
    setIsNavbarVisible(true);
  }, []);

  const goToPreviousEpisode = () => {
    const previousEpisode = Math.max(Number(episode) - 1, 1);
    router.push(`/streamtv/${mediaId}/${season}/${previousEpisode}`);
  };

  const goToNextEpisode = () => {
    const nextEpisode = Math.min(Number(episode) + 1, episodeCount);
    router.push(`/streamtv/${mediaId}/${season}/${nextEpisode}`);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseActivity = () => {
      clearTimeout(timeoutId);
      showNavbar();
      timeoutId = setTimeout(() => {
        setIsNavbarVisible(false);
      }, 3000);
    };
    document.addEventListener("mousemove", handleMouseActivity);
    document.addEventListener("keydown", handleMouseActivity);
    timeoutId = setTimeout(() => {
      setIsNavbarVisible(false);
    }, 3000);
    return () => {
      document.removeEventListener("mousemove", handleMouseActivity);
      document.removeEventListener("keydown", handleMouseActivity);
      clearTimeout(timeoutId);
    };
  }, [showNavbar]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      toast.info("Try other servers if Default Server fails.");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading) {
    return <CircleLoader />;
  }
  return (
    <div className="h-screen w-screen">
      {isNavbarVisible && (
        <nav className="fixed w-full p-6 z-10 flex items-center justify-between gap-8 bg-black bg-opacity-70">
          <div className="flex gap-4">
            <AiOutlineArrowLeft
              size={36}
              onClick={() => router.push(`/streamtv/${mediaId}/${season}`)}
              className="w-4 md:w-10 text-white cursor-pointer transition-transform transform hover:opacity-80 hover:-translate-x-2 duration-300"
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
        </nav>
      )}
      <VideoEmbedding embedURL={episodeURL} />
    </div>
  );
};

export default Episode;
