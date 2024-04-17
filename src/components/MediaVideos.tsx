import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { isEmpty } from "lodash";
import { BsFillPlayFill } from "react-icons/bs";
import { CustomLeftArrow, CustomRightArrow } from "./CustomArrows";

interface MediaVideosProps {
  videos: {
    results: Array<{}>;
  };
  title: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setVideoKey: React.Dispatch<React.SetStateAction<string>>;
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

const MediaVideos: React.FC<MediaVideosProps> = ({
  videos,
  title,
  setShow,
  setVideoKey,
}) => {
  if (isEmpty(videos)) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 py-4 space-y-8">
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
          {videos?.results.map((video: any) => (
            <div
              key={video.id}
              onClick={() => {
                setShow(true);
                setVideoKey(video.key);
              }}
              className="relative overflow-hidden group cursor-pointer"
            >
              <img
                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                alt="THumbnail"
                className="w-full h-full object-cover object-top block cursor-pointer transition duration-300 ease-in-out group-hover:scale-110"
              />
              <div className="bg-white rounded-full absolute bottom-12 left-3 h-10 w-10 hover:bg-neutral-300 text-black cursor-pointer flex items-center justify-center">
                <BsFillPlayFill size={24} />
              </div>
              <div
                className="text-white pt-4 overflow-hidden whitespace-nowrap overflow-ellipsis"
                title={video.name}
              >
                {video.name}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MediaVideos;
