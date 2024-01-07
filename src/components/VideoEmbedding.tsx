import React from "react";

interface VideoEmbeddingProps {
  embedURL: string;
}

const VideoEmbedding: React.FC<VideoEmbeddingProps> = ({ embedURL }) => {
  return (
    <>
      <iframe
        src={embedURL}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        scrolling="no"
        seamless
        allow="autoplay"
      ></iframe>
    </>
  );
};

export default VideoEmbedding;
