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
  InfoModal,
  MediaVideos,
} from "@/src/components";
import {
  useCredits,
  useInfoModal,
  useMedia,
  useRecommend,
  useSimilar,
} from "@/src/hooks";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Genre } from "@/src/types";
import Link from "next/link";
import { baseImgUrl } from "@/src/utils";
import { BsClockFill, BsFillPlayFill } from "react-icons/bs";
import { RiMovie2Line } from "react-icons/ri";
import { SiImdb } from "react-icons/si";

const MovieSelection = () => {
  const params = useParams() as { mediaId: string };
  const { mediaId } = params;
  const mediaType = "movie";
  const { data, isLoading } = useMedia(mediaType, mediaId);
  const { data: credits } = useCredits(mediaType, mediaId);
  const { data: mediaRecommended } = useRecommend(mediaType, mediaId);
  const { data: mediaSimilar } = useSimilar(mediaType, mediaId);
  const { isOpen, closeModal } = useInfoModal();
  const [show, setShow] = useState(false);
  const [videoKey, setVideoKey] = useState("");
  const isComingSoon = new Date(data?.release_date) > new Date();
  const director = credits?.crew?.filter((f: any) => f.job === "Director");
  const writer = credits?.crew?.filter(
    (f: any) =>
      f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );
  const key =
    data?.videos?.results.find(
      (video: { type: string }) => video.type === "Trailer"
    )?.key || data?.videos?.results[0]?.key;

  if (isLoading) {
    return <CircleLoader />;
  }

  return (
    <div className="bg-gradient-linear min-h-screen">
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className="sm:h-[500px] h-[300px] relative overflow-hidden">
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-transparent via-transparent to-body"></div>
        <img
          src={`${baseImgUrl}/${data?.backdrop_path}`}
          alt="data?.title"
          className="rounded-none"
        ></img>
      </div>
      <div className="max-w-7xl mx-auto p-4 flex flex-col gap-12 pb-12">
        <div className="-mt-[250px] flex sm:flex-row flex-col items-center relative z-10 gap-3">
          <img
            src={`${baseImgUrl}/${data?.poster_path}`}
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
            <div className="flex items-center justify-center sm:gap-3 gap-1 text-center">
              <p className="text-white font-semibold sm:text-lg text-sm">
                {new Date(
                  data?.release_date || data?.first_air_date
                ).getFullYear()}
              </p>
              <span className="text-white">|</span>
              <p className="text-white sm:text-lg text-sm">
                {`${Math.floor(data?.runtime / 60)}h ${data?.runtime % 60}min`}
              </p>
              <span className="text-white">|</span>
              <p className="text-violet-500 sm:text-lg text-sm">
                {data?.genres
                  ?.slice(0, 3)
                  .map((genre: Genre) => genre.name)
                  .join(", ")}
              </p>
              <div className="sm:flex items-center sm:absolute hidden right-0">
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
                    <RiMovie2Line size={34} />
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              {!isComingSoon ? (
                <Link
                  href={`/movies/${mediaId}/watch`}
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
                <p className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition cursor-not-allowed">
                  <BsClockFill
                    size={24}
                    className="w-4 sm:w-6 text-black pr-1"
                  />
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
                <CircleRating rating={data?.vote_average?.toFixed(1)} />
              </div>
              <FavoriteButton mediaType="movie" mediaId={data?.id.toString()} />
            </div>
            <div className="text-white drop-shadow-xl px-4">
              <div className="text-2xl mb-2">Overview</div>
              <div className="text-base leading-[22px] text-justify">
                {data?.overview}
              </div>
            </div>
            <div className="flex justify-between relative gap-3 text-white px-4">
              {director?.length > 0 && (
                <div className="text-sm md:text-lg">
                  <span className="text-neutral-400 text-base mr-1">
                    Director:{" "}
                  </span>
                  <span className="text-base leading-[22px] opacity-75">
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
                <div>
                  <span className="text-neutral-400 text-base mr-1">
                    Writer:{" "}
                  </span>
                  <span className="text-base leading-[22px] opacity-75">
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
      {data?.videos?.results?.length > 0 && (
        <MediaVideos
          title="Official Videos"
          videos={data?.videos}
          setShow={setShow}
          setVideoKey={setVideoKey}
        />
      )}
      <MediaList
        title="Recommended Movies"
        data={mediaRecommended}
        mediaType="movie"
      />
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
