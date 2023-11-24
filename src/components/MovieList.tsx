import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MediaInterface } from "@/src/types";
import { MovieCard } from ".";
import { isEmpty } from "lodash";

interface MovieListProps {
  data: MediaInterface[];
  title: string;
  mediaType: string;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 720 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 720, min: 0 },
    items: 2,
  },
};

const MovieList: React.FC<MovieListProps> = ({ data, title, mediaType }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <Carousel
          responsive={responsive}
          infinite={true}
          ssr={true}
          containerClass="-mx-[10px]"
          itemClass="sm:px-2 px-1"
        >
          {data.map((media) => (
            <MovieCard key={media.id} mediaType={mediaType} data={media} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MovieList;
