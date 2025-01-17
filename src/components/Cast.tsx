import React from "react";
import { baseImgUrl } from "@/src/utils";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CustomLeftArrow, CustomRightArrow } from "./CustomArrows";
interface CastProps {
  cast: {
    id: number;
    profile_path: string;
    name: string;
    character: string;
  }[];
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 9,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 720 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 720, min: 0 },
    items: 3,
  },
};

const avatar = "/images/avatar.png";

const Cast: React.FC<CastProps> = ({ cast }) => {
  return (
    <div className="px-4 md:px-12 space-y-8">
      <h1 className="text-white text-md md:text-xl lg:text-3xl">Top Cast</h1>
      {cast && (
        <Carousel
          responsive={responsive}
          ssr={true}
          containerClass="-mx-[10px]"
          itemClass="px-2"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          customRightArrow={<CustomRightArrow onClick={() => {}} />}
          customLeftArrow={<CustomLeftArrow onClick={() => {}} />}
        >
          {cast?.map((item) => (
            <div key={item.id} className="text-center text-white px-2">
              <div
                className="sm:w-32 w-24 sm:h-36 h-24 rounded-full mb-4 relative overflow-hidden bg-cover bg-no-repeat group"
                onClick={() =>
                  window.open(
                    `https://www.google.com/search?q=${item.name}`,
                    "_blank"
                  )
                }
              >
                <img
                  src={
                    item.profile_path ? baseImgUrl + item.profile_path : avatar
                  }
                  alt={item.name}
                  className="w-full h-full object-cover object-center block cursor-pointer transition duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="sm:text-base text-sm font-semibold">
                {item.name}
              </div>
              {item.character.length > 15 ? (
                /* @ts-ignore */
                <marquee className="sm:text-base text-sm opacity-60">
                  {item.character}
                  {/* @ts-ignore */}
                </marquee>
              ) : (
                <div className="sm:text-base text-sm opacity-60">
                  {item.character}
                </div>
              )}
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Cast;
