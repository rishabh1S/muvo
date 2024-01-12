import React from "react";

interface VideoEmbeddingProps {
  embedURL: string;
}

const VideoEmbedding: React.FC<VideoEmbeddingProps> = ({ embedURL }) => {
  return (
    <div className="relative pb-[56.29%] max-w-full block mx-auto overflow-hidden">
      <iframe
        src={embedURL}
        frameBorder="0"
        allowFullScreen
        scrolling="no"
        seamless
        allow="autoplay"
        className="absolute top-0 left-0 w-full h-full"
        referrerPolicy="no-referrer"
      ></iframe>
    </div>
  );
};

export default VideoEmbedding;
