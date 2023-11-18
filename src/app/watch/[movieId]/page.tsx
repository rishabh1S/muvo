"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import { useMovie } from "@/src/hooks";
import { embedUrl } from "@/public/utils";

const Watch = () => {
  const router = useRouter();
  const params = useParams() as { movieId: string };
  const { movieId } = params;

  const { data } = useMovie(movieId as string);

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const showNavbar = useCallback(() => {
    setIsNavbarVisible(true);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseActivity = () => {
      // Reset the timer
      clearTimeout(timeoutId);

      // Show the navbar
      showNavbar();

      // Set a new timer to hide the navbar after 5 seconds
      timeoutId = setTimeout(() => {
        setIsNavbarVisible(false);
      }, 5000);
    };

    // Add event listeners for mouse activity
    document.addEventListener("mousemove", handleMouseActivity);
    document.addEventListener("keydown", handleMouseActivity);

    // Initial setup to hide the navbar after 5 seconds
    timeoutId = setTimeout(() => {
      setIsNavbarVisible(false);
    }, 5000);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseActivity);
      document.removeEventListener("keydown", handleMouseActivity);
      clearTimeout(timeoutId);
    };
  }, [showNavbar]);
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
            <span className="font-light">Watching:</span> {data?.title}
          </p>
        </nav>
      )}
      <iframe
        src={`${embedUrl}/${movieId}`}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        seamless
        allow="autoplay"
        referrerPolicy="no-referrer"
      ></iframe>
    </div>
  );
};

export default Watch;
