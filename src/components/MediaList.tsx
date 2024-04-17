import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MediaInterface } from "@/src/types";
import { MediaCard } from ".";
import { isEmpty } from "lodash";
import { CustomLeftArrow, CustomRightArrow } from "./CustomArrows";

interface MediaListProps {
  data: MediaInterface[];
  title: string;
  mediaType: string;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 3,
    partialVisibilityGutter: 50,
  },
  tablet: {
    breakpoint: { max: 1024, min: 720 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 720, min: 0 },
    items: 2,
    partialVisibilityGutter: 20,
  },
};

const MediaList: React.FC<MediaListProps> = ({ data, title, mediaType }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-3xl sm:mb-4 mb-2">
          {title}
        </p>
        <Carousel
          responsive={responsive}
          ssr={true}
          containerClass="-mx-[10px]"
          itemClass="sm:px-2 px-1"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          partialVisible={true}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
        >
          {data.map((media) => (
            <MediaCard key={media.id} mediaType={mediaType} data={media} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MediaList;
