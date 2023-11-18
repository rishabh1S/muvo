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
        seamless
        allow="autoplay"
        referrerPolicy="no-referrer"
      ></iframe>
    </>
  );
};

export default VideoEmbedding;
