"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import { useMovie } from "@/src/hooks";
import { embedMovieUrl } from "@/public/utils";
import { VideoEmbedding } from "@/src/components";

const Watch = () => {
  const router = useRouter();
  const params = useParams() as { mediaId: string };
  const { mediaId } = params;
  const mediaType = "movie";
  const { data } = useMovie(mediaType, mediaId);

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const showNavbar = useCallback(() => {
    setIsNavbarVisible(true);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseActivity = () => {
      clearTimeout(timeoutId);
      showNavbar();
      timeoutId = setTimeout(() => {
        setIsNavbarVisible(false);
      }, 5000);
    };
    document.addEventListener("mousemove", handleMouseActivity);
    document.addEventListener("keydown", handleMouseActivity);
    timeoutId = setTimeout(() => {
      setIsNavbarVisible(false);
    }, 5000);
    return () => {
      document.removeEventListener("mousemove", handleMouseActivity);
      document.removeEventListener("keydown", handleMouseActivity);
      clearTimeout(timeoutId);
    };
  }, [showNavbar]);

  const episodeURL = `${embedMovieUrl}${mediaId}`;
  return (
    <div className="h-screen w-screen">
      {isNavbarVisible && (
        <nav className="fixed w-full p-6 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
          <AiOutlineArrowLeft
            size={36}
            onClick={() => router.push("/")}
            className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition"
          />
          <p className="text-white text-1xl md:text-3xl font-bold">
            <span className="font-light">Watching:</span>{" "}
            {data?.title || data?.name}
          </p>
        </nav>
      )}
      <VideoEmbedding embedURL={episodeURL} />
    </div>
  );
};

export default Watch;
