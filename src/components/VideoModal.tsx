import React, { useRef, useEffect, useCallback } from "react";
import { VideoPlayer } from ".";
import { baseYoutubeUrl } from "@/public/utils";
import { AiOutlineClose } from "react-icons/ai";

interface VideoModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  videoKey: string | null;
  setVideoKey: React.Dispatch<React.SetStateAction<string | null>>;
}

const VideoModal: React.FC<VideoModalProps> = ({
  show,
  setShow,
  videoKey,
  setVideoKey,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const hidePopup = useCallback(() => {
    setShow(false);
    setVideoKey(null);
  }, [setShow, setVideoKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        hidePopup();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, hidePopup]);

  return (
    <div
      className={`flex justify-center items-center w-full h-full fixed top-0 left-0 transform duration-300 bg-black/80 ${
        show ? "visible" : "invisible"
      } z-50`}
    >
      <div
        ref={modalRef}
        className="relative lg:h-[450px] md:h-96 aspect-video"
      >
        <VideoPlayer
          url={`${baseYoutubeUrl}${videoKey}`}
          muted={false}
          controls={true}
        />
        <div
          onClick={hidePopup}
          className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
        >
          <AiOutlineClose size={24} className="text-white w-6" />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
