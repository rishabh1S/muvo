import React from "react";
import MediaCard from "./MediaCard";
import { MediaInterface } from "../types";

interface MediaSectionProps {
  mediaData: MediaInterface[];
}

const MediaSection: React.FC<MediaSectionProps> = ({ mediaData }) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2">
      {mediaData?.map((media, index) => (
        <MediaCard key={index} mediaType={media.mediaType || ""} data={media} />
      ))}
    </div>
  );
};

export default MediaSection;
