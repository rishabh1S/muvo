"use client";
import {
  CircleLoader,
  CircleRating,
  FavoriteButton,
  Footer,
  MediaList,
  Navbar,
  VideoModal,
  Cast,
} from "@/src/components";
import { useCredits, useMedia, useSimilar } from "@/src/hooks";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Genre } from "@/src/types";
import Link from "next/link";
import { baseUrl } from "@/public/utils";
import { BsFillPlayFill } from "react-icons/bs";
import { RiMovie2Line } from "react-icons/ri";
import { SiImdb } from "react-icons/si";
import { useSession } from "next-auth/react";

const MovieSelection = () => {
  const session = useSession();
  const router = useRouter();
  const params = useParams() as { mediaId: string };
  const { mediaId } = params;
  const mediaType = "movie";
  const { data, isLoading } = useMedia(mediaType, mediaId);
  const { data: credits } = useCredits(mediaType, mediaId);
  const { data: mediaSimilar } = useSimilar(mediaType, mediaId);
  const [show, setShow] = useState(false);
  const [videoKey, setVideoKey] = useState("");
  const isComingSoon = new Date(data?.release_date) > new Date();
  const director = credits?.crew.filter((f: any) => f.job === "Director");
  const writer = credits?.crew?.filter(
    (f: any) =>
      f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );
  const key =
    data?.videos?.results.find(
      (video: { type: string }) => video.type === "Trailer"
    )?.key || data?.videos?.results[0]?.key;

  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/auth");
    }
  }, [session?.status, router]);

  if (isLoading) {
    return <CircleLoader />;
  }

  return (
    <div className="bg-body min-h-screen">
      <Navbar />
      <div className="sm:h-[400px] h-[300px] relative overflow-hidden">
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-transparent via-transparent to-body"></div>
        <img
          src={`${baseUrl}/${data?.backdrop_path}`}
          alt="data?.title"
          className="rounded-none"
        ></img>
      </div>
      <div className="max-w-7xl mx-auto p-4 flex flex-col gap-12 pb-12">
        <div className="-mt-[180px] flex sm:flex-row flex-col items-center relative z-10 gap-3">
          <img
            src={`${baseUrl}/${data?.poster_path}`}
            alt={data?.title}
            draggable={false}
            className="sm:w-[200px] w-36 sm:h-[300px]"
          />
          <div className="mx-auto flex flex-col gap-3">
            <div className="text-white text-3xl md:text-4xl h-full lg:text-5xl sm:mb-4 font-bold text-center">
              {data?.title || data?.original_title}
              <div className="sm:text-sm text-xs sm:mt-2 italic opacity-60">
                {data?.tagline}
              </div>
            </div>
            <div className="flex items-center justify-center sm:gap-3 gap-1">
              <p className="text-white font-semibold sm:text-lg">
                {new Date(
                  data?.release_date || data?.first_air_date
                ).getFullYear()}
              </p>
              <span className="text-white">|</span>
              <p className="text-white sm:text-lg">
                {`${Math.floor(data?.runtime / 60)}h ${data?.runtime % 60}min`}
              </p>
              <span className="text-white">|</span>
              <p className="text-violet-500 sm:text-lg">
                {data?.genres?.map((genre: Genre) => genre.name).join(", ")}
              </p>
              <div className="flex items-center sm:absolute right-0">
                {data?.imdb_id && (
                  <Link
                    href={`https://www.imdb.com/title/${data.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-500 mx-2"
                  >
                    <SiImdb size={22} className="lg:hidden" />
                    <SiImdb size={30} className="hidden lg:block" />
                  </Link>
                )}
                {data?.id && (
                  <Link
                    href={`https://www.themoviedb.org/movie/${data?.id}`}
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
            <div className="flex items-center justify-center gap-4">
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
              <div
                onClick={() => {
                  setShow(true);
                  setVideoKey(key);
                }}
                className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition text-black cursor-pointer"
              >
                <BsFillPlayFill
                  size={24}
                  className="w-4 md:w-7 text-black mr-1"
                />
                Play Trailer
              </div>
              <VideoModal
                show={show}
                setShow={setShow}
                videoKey={videoKey}
                setVideoKey={
                  setVideoKey as React.Dispatch<
                    React.SetStateAction<string | null>
                  >
                }
              ></VideoModal>
              <div className="sm:w-12 w-8 sm:h-12 h-8">
                <CircleRating rating={data?.vote_average.toFixed(1)} />
              </div>
              <FavoriteButton mediaType="movie" mediaId={data?.id.toString()} />
            </div>
            <div className="text-white drop-shadow-xl px-4">
              <div className="text-2xl mb-2">Overview</div>
              <div className="text-sm md:text-lg text-justify">
                {data?.overview}
              </div>
            </div>
            <div className="flex justify-between relative gap-3 text-white px-4">
              {director?.length > 0 && (
                <div className="text-sm md:text-lg">
                  <span className="font-bold">Director: </span>
                  <span className="opacity-60">
                    {director?.map((d: any, i: number) => (
                      <span key={i}>
                        {d.name}
                        {director.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )}
              {writer?.length > 0 && (
                <div className="text-sm md:text-lg">
                  <span className="font-bold">Writer: </span>
                  <span className="opacity-60">
                    {writer?.map((d: any, i: number) => (
                      <span key={i}>
                        {d.name}
                        {writer.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Cast cast={credits?.cast} />
      <div className="pb-20">
        <MediaList
          title="Similar Movies"
          data={mediaSimilar}
          mediaType="movie"
        />
      </div>
      <Footer />
    </div>
  );
};

export default MovieSelection;
