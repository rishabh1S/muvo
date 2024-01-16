"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { BsFillPlayFill, BsChevronDown } from "react-icons/bs";

import { MediaInterface } from "@/src/types";
import { FavoriteButton } from ".";
import { useInfoModal } from "../hooks";
import { baseUrl } from "@/public/utils";

interface MediaCardProps {
  data: MediaInterface;
  mediaType: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ data, mediaType }) => {
  const router = useRouter();

  const { openModal } = useInfoModal();

  const redirectToWatch = useCallback(
    () =>
      mediaType === "tv"
        ? router.push(`/shows/${data.id}`)
        : router.push(`/movies/${data.id}`),
    [router, data.id, mediaType]
  );

  const imagePath = data?.backdrop_path
    ? `${baseUrl}/${data.backdrop_path}`
    : "/images/no-backdrop.png";
  return (
    <div className="relative overflow-hidden bg-cover bg-no-repeat group">
      <img
        onClick={redirectToWatch}
        src={imagePath}
        alt="Movie"
        draggable={false}
        className="
        cursor-pointer transition duration-300 ease-in-out group-hover:scale-110 w-full h-full object-cover
      "
      />
      <div className="opacity-0 absolute transform w-full group-hover:opacity-100">
        <div className="z-10 bg-zinc-900/90 p-2 sm:p-4 absolute w-full transition shadow-md bottom-0">
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={redirectToWatch}
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
            >
              <BsFillPlayFill size={30} className="text-black w-4 lg:w-6" />
            </div>
            <FavoriteButton
              mediaType={mediaType}
              mediaId={data.id.toString()}
            />
            <div
              onClick={() => openModal(mediaType, data.id.toString())}
              className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
            >
              <BsChevronDown
                size={20}
                className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6"
              />
            </div>
          </div>
          <div className="pt-2 text-white text-sm sm:text-2xl overflow-hidden overflow-ellipsis whitespace-nowrap">
            {data?.title || data?.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
