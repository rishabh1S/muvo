"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import { useMedia } from "@/src/hooks";
import { baseUrl, embedMovieUrl } from "@/public/utils";
import {
  CircleLoader,
  CircleRating,
  FavoriteButton,
  Footer,
  Overlay,
  VideoEmbedding,
} from "@/src/components";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { RiMovie2Line } from "react-icons/ri";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { MdInfoOutline } from "react-icons/md";
import Link from "next/link";
import { SiImdb } from "react-icons/si";

const Watch = () => {
  const router = useRouter();
  const session = useSession();
  const [showSignupOverlay, setShowSignupOverlay] = useState(false);
  const params = useParams() as { mediaId: string };
  const { mediaId } = params;
  const mediaType = "movie";
  const { data, isLoading } = useMedia(mediaType, mediaId);

  useEffect(() => {
    if (session?.status !== "authenticated") {
      setShowSignupOverlay(true);
    }
  }, [session?.status]);

  if (isLoading) {
    return <CircleLoader />;
  }

  if (showSignupOverlay) {
    return <Overlay data={data} router={router} />;
  }

  const episodeURL = `${embedMovieUrl}${mediaId}`;
  return (
    <>
      <div className="relative min-h-screen">
        <nav className="w-full fixed z-40">
          <div className="p-6 flex items-center gap-8 bg-black bg-opacity-70 backdrop-blur-sm">
            <AiOutlineArrowLeft
              size={36}
              onClick={() => router.push(`/movies/${mediaId}`)}
              className="w-6 md:w-10 text-white cursor-pointer transition-transform transform hover:opacity-80 hover:-translate-x-2 duration-300"
            />
            <div className="text-white text-1xl md:text-3xl">
              <span className="font-light">Watching:</span>{" "}
              {data?.title || data?.name}
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
              <div className="lg:w-1/5 bg-zinc-950">
                <div className="text-white p-4 text-sm font-medium">
                  List of Episodes:
                </div>
                <ul className="overflow-y-auto max-h-screen">
                  <Link href={`/movies/${mediaId}/watch`} passHref>
                    <li className="p-2 cursor-pointer border-l-4 border-[#8dc53e] text-[#8dc53e] bg-[#18181b] hover:bg-zinc-700">
                      <div className="flex items-center">
                        <span className="pr-4 font-semibold">1</span>
                        <span className="font-light overflow-hidden overflow-ellipsis whitespace-nowrap">
                          Full
                        </span>
                        <span className="ml-auto">
                          <FaRegCirclePlay size={22} />
                        </span>
                      </div>
                    </li>
                  </Link>
                </ul>
              </div>
              <div className="lg:w-4/5 flex flex-col bg-[#060002] text-white">
                <div>
                  <VideoEmbedding embedURL={episodeURL} />{" "}
                </div>
                <div className="p-2 text-center">
                  You are watching{" "}
                  <span className="font-bold">{data?.title || data?.name}</span>
                  .
                  <div className="font-thin">
                    If current server doesn&apos;t work please try other servers
                    by clicking on servers icon.
                  </div>
                </div>
              </div>
            </div>
            <div
              className="lg:col-span-2 lg:row-span-5 lg:col-start-6 row-start-5"
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)" }}
            >
              <div className="flex flex-col sm:items-start items-center gap-3 drop-shadow-lg">
                <img
                  src={`${baseUrl}/${data?.poster_path}`}
                  alt={data?.title}
                  className="w-36 h-60"
                />
                <div className="text-white text-xl md:text-2xl lg:text-3xl font-bold">
                  {data?.title}
                  <div className="sm:text-sm text-xs sm:mt-1 italic opacity-60">
                    {data?.tagline}
                  </div>
                </div>
                <div className="flex items-center sm:gap-3 gap-1">
                  <p className="text-white font-semibold text-lg">
                    {new Date(
                      data?.release_date || data?.first_air_date
                    ).getFullYear()}
                  </p>
                  <span className="text-white">|</span>
                  <p className="text-white sm:text-lg">
                    {`${Math.floor(data?.runtime / 60)}h ${
                      data?.runtime % 60
                    }min`}
                  </p>
                  <div className="w-10">
                    <CircleRating rating={data?.vote_average.toFixed(1)} />
                  </div>
                  <FavoriteButton
                    mediaType="tv"
                    mediaId={data?.id.toString()}
                  />
                  <div className="flex items-center">
                    {data?.imdb_id && (
                      <Link
                        href={`https://www.imdb.com/title/${data.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-500 mx-2"
                      >
                        <SiImdb size={24} className="lg:hidden" />
                        <SiImdb size={38} className="hidden lg:block" />
                      </Link>
                    )}
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
                  {data?.overview}
                </div>
              </div>
              <div className="flex sm:justify-start justify-center gap-4">
                <button
                  type="button"
                  onClick={() => router.push(`/movies/${mediaId}`)}
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
      <Footer />
    </>
  );
};

export default Watch;
