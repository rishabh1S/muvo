import React from "react";
import { FaCheck } from "react-icons/fa";
import { Footer } from ".";
import { IoMdClose } from "react-icons/io";
import { baseImgUrl } from "@/src/utils";
import { MediaInterface } from "../types";
import { NextRouter } from "next/router";

interface OverlayProps {
  data: MediaInterface;
  router: NextRouter;
}

const Overlay: React.FC<OverlayProps> = ({ data, router }) => {
  return (
    <div className="relative overflow-hidden z-40">
      <div className="fixed inset-0 bg-cover -z-20 animate-float" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-l from-body to-body/60" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-body/80 via-body/30 to-transparent" />
      <nav className="sm:fixed w-full z-40 sm:px-12 px-2 py-5 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-8 ">
          <div className="flex items-center gap-5">
            <IoMdClose
              size={36}
              onClick={() => router.back()}
              className="w-6 sm:w-10 text-white cursor-pointer transition-transform transform hover:opacity-80 duration-300"
            />
            <img src="/images/logo.png" className="h-6 lg:h-14" alt="Logo" />
          </div>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-xl sm:px-8 px-4 sm:py-3 py-2 text-center"
            onClick={() => router.push("/auth")}
          >
            Login
          </button>
        </div>
      </nav>
      <div className="min-h-screen flex items-stretch justify-center">
        <div className="grid sm:grid-cols-5 sm:grid-rows-1 grid-rows-7 grid-cols-1 sm:gap-12 gap-3 max-w-6xl">
          <div className="sm:col-span-2 col-span-1 sm:row-span-1 row-span-3 flex flex-col justify-center sm:items-start items-center py-4">
            <img
              src={`${baseImgUrl}/${data?.poster_path}`}
              alt="Movie Poster"
              className="w-36 h-60 mb-4"
            />
            <div className="text-white sm:text-5xl text-xl font-bold sm:text-left text-center">
              Start your streaming journey today
            </div>
          </div>
          <div className="sm:col-span-3 col-span-1 sm:col-start-3 sm:row-span-1 row-span-4 row-start-4 flex flex-col justify-center text-white sm:text-3xl text-xl px-2 py-4">
            <div className="flex flex-col w-full px-2 gap-8 py-8">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span>All Content</span>
                  <span className="text-zinc-500 sm:text-lg text-sm">
                    Movies, Series, Tv shows, Anime
                  </span>
                </div>
                <FaCheck size={36} />
              </div>
              <div className="flex justify-between items-center">
                <div className="w-3/4">
                  Number of devices that can be logged in
                </div>
                <div className="sm:text-xl text-base">Unlimited</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">Max Video Quality</div>
                <div className="flex flex-col items-center sm:text-xl text-base">
                  <span>Full HD</span>
                  <span>1080p</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>Subtitles</div>
                <FaCheck size={36} />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span>Download</span>
                  <span className="text-zinc-500 sm:text-lg text-sm">
                    Availability depends on the server
                  </span>
                </div>
                <FaCheck size={36} />
              </div>
            </div>
            <button
              className="text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-xl sm:px-8 px-4 sm:py-3 py-2 text-center"
              onClick={() => router.push("/auth")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Overlay;
