import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
  muted: boolean;
  controls: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, muted, controls }) => {
  return (
    <ReactPlayer
      url={url}
      width="100%"
      height="100%"
      playing
      muted={muted}
      loop
      controls={controls}
      onEnded={() => {}}
    />
  );
};

export default VideoPlayer;
