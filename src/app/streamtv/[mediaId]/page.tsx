"use client";
import {
  CircleLoader,
  FavoriteButton,
  Navbar,
  Footer,
  VideoModal,
  CircleRating,
  MovieList,
} from "@/src/components";
import { useMovie, useSimilar } from "@/src/hooks";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Genre } from "@/src/types";
import Link from "next/link";
import { baseUrl, baseYoutubeUrl } from "@/public/utils";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { RiMovie2Line } from "react-icons/ri";
import { BsFillPlayFill } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa6";
import { useSession } from "next-auth/react";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 720 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 720, min: 0 },
    items: 2,
  },
};

const TvSelection = () => {
  const session = useSession();
  const router = useRouter();
  const params = useParams() as { mediaId: string };
  const { mediaId } = params;
  const mediaType = "tv";
  const { data, isLoading } = useMovie(mediaType, mediaId);
  const { data: mediaSimilar } = useSimilar(mediaType, mediaId);
  const [show, setShow] = useState(false);
  const [videoKey, setVideoKey] = useState("");
  const isComingSoon = new Date(data?.first_air_date) > new Date();
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
      <div className="h-[300px] relative overflow-hidden">
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-transparent via-transparent to-body"></div>
        <img
          src={`${baseUrl}/${data?.backdrop_path}`}
          alt="data?.title"
          className="w-full h-auto"
        ></img>
      </div>
      <div className="max-w-7xl mx-auto p-4 flex flex-col gap-12 pb-20">
        <div className="-mt-[150px] flex sm:flex-row flex-col items-center relative z-10 gap-3">
          <img
            src={`${baseUrl}/${data?.poster_path}`}
            alt="data?.title"
            className="sm:w-[200px] w-36 sm:h-[300px]"
          ></img>
          <div className="mx-auto flex flex-col items-center gap-3">
            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8 text-center">
              {data?.name}
            </p>
            <p className="text-white font-semibold text-lg">
              {new Date(data?.first_air_date).getFullYear()} to{" "}
              {new Date(data?.last_air_date).getFullYear()}
            </p>
            <div className="flex items-center gap-4">
              {!isComingSoon ? (
                <Link
                  href={`/streamtv/${mediaId}/1/1`}
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
                <CircleRating rating={data.vote_average.toFixed(1)} />
              </div>
              <FavoriteButton mediaType="tv" mediaId={data?.id.toString()} />
            </div>
            <div className="flex items-center gap-3">
              <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                {data?.genres?.map((genre: Genre) => (
                  <li
                    key={genre.id}
                    className="p-2 bg-primary text-gray-200 rounded-lg text-sm text-center"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
              <div className="sm:absolute right-0">
                {data?.id && (
                  <Link
                    href={`https://www.themoviedb.org/tv/${data?.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    <RiMovie2Line size={36} />
                  </Link>
                )}
              </div>
            </div>
            <p className="text-white text-justify text-[14px] md:text-lg drop-shadow-xl px-4">
              {data?.overview}
            </p>
          </div>
        </div>
        <Carousel
          responsive={responsive}
          infinite={true}
          ssr={true}
          containerClass="-mx-[10px]"
          itemClass="px-2"
        >
          {data?.seasons.map(
            (
              season: {
                name: string;
                poster_path: string | null;
                season_number: number;
              },
              i: number
            ) => (
              <Link
                href={`/streamtv/${data.id}/${season.season_number}`}
                passHref
                className="block border border-gray-800 rounded shadow hover:bg-gray-800 transition duration-300 relative group hover:scale-105"
                key={i}
              >
                <div className="relative overflow-hidden aspect-w-4 aspect-h-3">
                  <img
                    src={`${baseUrl}/${
                      season?.poster_path || data?.backdrop_path
                    }`}
                    alt={`Season ${season.name} Cover`}
                    className="object-cover w-full h-full group-hover:opacity-70"
                  />
                </div>
                <div className="absolute top-2 left-2 bg-black bg-opacity-60 p-1 rounded">
                  <span className="font-bold text-white">{season.name}</span>
                </div>
              </Link>
            )
          )}
        </Carousel>
      </div>
      <div className="pb-20">
        <MovieList
          title="Similar Tv shows"
          data={mediaSimilar}
          mediaType="tv"
        />
      </div>
      <Footer />
    </div>
  );
};

export default TvSelection;
