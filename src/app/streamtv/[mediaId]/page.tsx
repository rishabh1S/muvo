"use client";
import { CircleLoader, FavoriteButton, PlayButton } from "@/src/components";
import { useMovie } from "@/src/hooks";
import { useParams } from "next/navigation";
import React from "react";
import { Genre } from "@/src/types";
import Link from "next/link";
import { baseUrl } from "@/public/utils";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
  const params = useParams() as { mediaId: string };
  const { mediaId } = params;
  const mediaType = "tv";
  const { data, isLoading } = useMovie(mediaType, mediaId);
  console.log(data);

  if (isLoading) {
    return <CircleLoader />;
  }

  return (
    <div className="bg-body">
      <div className="h-[300px] relative overflow-hidden">
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-transparent via-transparent to-body"></div>
        <img
          src={`${baseUrl}/${data?.backdrop_path}`}
          alt="data?.title"
          className="rounded-none"
        ></img>
      </div>
      <div className="max-w-7xl mx-auto p-4 flex flex-col gap-12">
        <div className="-mt-[150px] flex items-center relative z-10">
          <img
            src={`${baseUrl}/${data?.poster_path}`}
            alt="data?.title"
            className="w-[200px] min-w-[200px] h-[300px] sm:mx-auto"
          ></img>
          <div className="mx-auto flex flex-col items-center gap-3">
            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
              {data?.name}
            </p>
            <ul className="flex items-center gap-3">
              {data?.genres?.map((genre: Genre) => (
                <li
                  key={genre.id}
                  className="px-4 py-2 bg-primary text-gray-200 rounded-lg text-sm"
                >
                  {genre.name}
                </li>
              ))}
            </ul>
            <p className="text-white text-[8px] md:text-lg drop-shadow-xl w-[90%] ">
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
          {data?.seasons.map((season, i: number) => (
            <Link
              href={`/streamtv/${data.id}/${season.season_number}`}
              passHref
              className="block border border-gray-800 rounded shadow hover:bg-gray-800 transition duration-300 relative group hover:scale-105"
              key={i}
            >
              <div className="relative overflow-hidden aspect-w-4 aspect-h-3">
                <img
                  src={`${baseUrl}/${season?.poster_path}`}
                  alt={`Season ${season.name} Cover`}
                  className="object-cover w-full h-full group-hover:opacity-70"
                />
              </div>
              <div className="absolute top-2 left-2 bg-black bg-opacity-60 p-1 rounded">
                <span className="font-bold text-white">{season.name}</span>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TvSelection;
