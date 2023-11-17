import React, { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { AiOutlineInfoCircle } from "react-icons/ai";
import useBillboard from "@/app/hooks/useBillBoard";
import { PlayButton } from ".";
import useInfoModal from "@/app/hooks/useInfoModal";
import {
  baseUrl,
  baseYoutubeUrl,
  getTVorMovieVideosByID,
} from "@/public/utils";

const Billboard: React.FC = () => {
  const { openModal } = useInfoModal();
  const { data } = useBillboard();
  const [key, setKey] = useState(null);
  console.log(data);

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (data) {
        const videosData = await getTVorMovieVideosByID(
          data.media_type,
          data.id.toString()
        );
        if (videosData && videosData.results && videosData.results.length > 0) {
          setKey(videosData.results[0].key);
        }
      }
    };
    fetchPlayerData();
  }, [data]);

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  return (
    <div className="relative h-[56.25vw]">
      {key ? (
        <>
          <ReactPlayer
            url={`${baseYoutubeUrl}${key}`}
            width="100%"
            height="100%"
            playing
            muted
            loop
            controls={false}
            onEnded={() => {}}
            style={{ filter: "brightness(0.7)" }}
          />
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
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.overview?.split(" ").length > 20
            ? `${data?.overview?.split(" ").slice(0, 20).join(" ")} ...`
            : data?.overview}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
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
