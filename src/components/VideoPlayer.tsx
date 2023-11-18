import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <ReactPlayer
      url={url}
      width="100%"
      height="100%"
      playing
      muted
      loop
      controls={false}
      onEnded={() => {}}
      style={{ filter: "brightness(0.7)" }}
    />
  );
};

export default VideoPlayer;
