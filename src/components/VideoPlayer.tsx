import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
  muted: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, muted }) => {
  return (
    <ReactPlayer
      url={url}
      width="100%"
      height="100%"
      playing
      muted={muted}
      loop
      controls={false}
      onEnded={() => {}}
      style={{ filter: "brightness(0.7)" }}
    />
  );
};

export default VideoPlayer;
