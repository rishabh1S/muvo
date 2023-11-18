import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useBillboard, useInfoModal } from "../hooks";
import { CircleLoader, PlayButton, VideoPlayer } from ".";
import {
  baseUrl,
  baseYoutubeUrl,
  getTVorMovieVideosByID,
} from "@/public/utils";

interface BillboardProps {
  mediaType: string;
}

const Billboard: React.FC<BillboardProps> = ({ mediaType }) => {
  const { openModal } = useInfoModal();
  const { data, isLoading } = useBillboard(mediaType);
  const [key, setKey] = useState(null);
  const isComingSoon = new Date(data?.release_date) > new Date();

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (data) {
        const videosData = await getTVorMovieVideosByID(
          data.media_type,
          data.id.toString()
        );
        if (videosData && videosData.results && videosData.results.length > 0) {
          const filteredResults = videosData.results.filter(
            (item: { type: string }) => item.type === "Trailer"
          );
          if (filteredResults.length > 0) {
            setKey(filteredResults[0].key);
          }
        }
      }
    };
    fetchPlayerData();
  }, [data]);

  const handleOpenModal = useCallback(() => {
    openModal(data?.media_type, data?.id.toString());
  }, [openModal, data?.media_type, data?.id]);

  if (isLoading) {
    return <CircleLoader />;
  }

  return (
    <div className="relative h-[56.25vw]">
      {key ? (
        <>
          <VideoPlayer url={`${baseYoutubeUrl}${key}`} muted={true} />
          <div className="absolute top-0 left-0 w-full h-full bg-transparent" />
        </>
      ) : (
        <img
          src={`${baseUrl}/${data?.backdrop_path || data?.poster_path}`}
          alt={data?.title}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-xl md:text-4xl h-full sm:w-[70%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title || data?.name}
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
              py-1 md:py-2 
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
