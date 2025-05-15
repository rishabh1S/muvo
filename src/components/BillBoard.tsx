import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useBillboard, useInfoModal } from "../hooks";
import { PlayButton, VideoPlayer } from ".";
import {
  baseImgUrl,
  baseYoutubeUrl,
  getTVorMovieVideosByID,
} from "@/src/utils";

interface BillboardProps {
  mediaType: string;
}

const BillboardSkeleton = () => (
  <div className="relative sm:h-[56.25vw] h-[65vw] overflow-hidden">
    {/* Glassmorphism backdrop */}
    <div className="absolute inset-0 backdrop-blur-md border border-white/10 rounded-lg">
      {/* Animated shimmer (subtle pulse) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
    </div>

    {/* Content container */}
    <div className="absolute top-[35%] md:top-[40%] ml-4 md:ml-16 w-[90%] md:w-[70%]">
      {/* Title & description group */}
      <div className="flex flex-col gap-3">
        {/* Title (frosted glass) */}
        <div className="h-8 md:h-12 lg:h-16 bg-white/10 backdrop-blur-sm rounded-lg w-3/4 border border-white/5" />

        {/* Description lines */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="h-3 bg-white/10 backdrop-blur-sm rounded-full w-full border border-white/5" />
          <div className="h-3 bg-white/10 backdrop-blur-sm rounded-full w-5/6 border border-white/5" />
          <div className="h-3 bg-white/10 backdrop-blur-sm rounded-full w-2/3 border border-white/5" />
        </div>
      </div>

      {/* Buttons group */}
      <div className="flex gap-3 mt-6">
        {/* Play button skeleton */}
        <div className="h-9 md:h-10 w-24 md:w-32 bg-white/20 backdrop-blur-sm rounded-md border border-white/10" />

        {/* Info button skeleton */}
        <div className="flex items-center gap-2 h-9 md:h-10 px-4 bg-white/10 backdrop-blur-sm rounded-md border border-white/10">
          <div className="h-4 w-4 bg-white/30 rounded-full" />
          <div className="h-3 w-12 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

const Billboard: React.FC<BillboardProps> = ({ mediaType }) => {
  const { openModal } = useInfoModal();
  const { data, isLoading } = useBillboard(mediaType);
  const [key, setKey] = useState(null);
  const [videoLoading, setVideoLoading] = useState(true);
  const isComingSoon = new Date(data?.release_date) > new Date();

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (data) {
        setVideoLoading(true);
        try {
          const videosData = await getTVorMovieVideosByID(
            data.media_type,
            data.id.toString()
          );
          if (videosData?.results && videosData?.results.length > 0) {
            const filteredResults = videosData.results.filter(
              (item: { type: string }) => item.type === "Trailer"
            );
            if (filteredResults.length > 0) {
              setKey(filteredResults[0].key);
            }
          }
        } finally {
          setVideoLoading(false);
        }
      }
    };
    fetchPlayerData();
  }, [data]);

  const handleOpenModal = useCallback(() => {
    openModal(mediaType, data?.id.toString());
  }, [openModal, mediaType, data?.id]);

  if (isLoading || !data) {
    return <BillboardSkeleton />;
  }

  return (
    <div className="relative sm:h-[56.25vw] h-[65vw]">
      {videoLoading && key && <BillboardSkeleton />}
      {key ? (
        <>
          <VideoPlayer
            url={`${baseYoutubeUrl}${key}`}
            muted={true}
            controls={false}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
        </>
      ) : (
        <img
          src={`${baseImgUrl}/${data?.backdrop_path ?? data?.poster_path}`}
          alt={data?.title}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute top-[35%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-xl md:text-4xl h-full sm:w-[70%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title ?? data?.name}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.overview?.split(" ").length > 20
            ? `${data?.overview?.split(" ").slice(0, 20).join(" ")} ...`
            : data?.overview}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          {!isComingSoon && (
            <PlayButton
              mediaType={data?.media_type}
              mediaId={data?.id.toString()}
            />
          )}
          {isComingSoon && (
            <p
              className="bg-white 
                  rounded-md 
                  py-1 md:py-2 
                  px-2 md:px-4
                  w-auto 
                  text-xs lg:text-lg 
                  font-semibold
                  flex
                  flex-row
                  items-center
                  hover:bg-neutral-300
                  transition text-black"
            >
              Coming Soon
            </p>
          )}
          <button
            onClick={handleOpenModal}
            className="
            bg-white
            text-white
              bg-opacity-30 
              rounded-md 
              py-1.5 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
            "
          >
            <AiOutlineInfoCircle className="w-4 md:w-7 mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
export default Billboard;
