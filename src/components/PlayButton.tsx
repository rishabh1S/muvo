import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface PlayButtonProps {
  mediaType?: string;
  mediaId?: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ mediaType, mediaId }) => {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        mediaType === "tv"
          ? router.push(`/shows/${mediaId}`)
          : router.push(`/movies/${mediaId}`)
      }
      className="
        bg-white 
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
        transition
        "
    >
      <BsFillPlayFill size={22} className="w-4 md:w-7 text-black pr-1" />
      Play
    </button>
  );
};

export default PlayButton;
