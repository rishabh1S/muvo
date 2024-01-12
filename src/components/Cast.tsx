import React from "react";
import { baseUrl } from "@/public/utils";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
        Top Cast
      </p>
      {cast && (
        <Carousel
          responsive={responsive}
          infinite={true}
          ssr={true}
          containerClass="-mx-[10px]"
          itemClass="sm:px-2 px-1"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {cast?.map((item) => (
            <div key={item.id} className="text-center text-white">
              <div
                className="w-32 h-36 rounded-full mb-4 relative overflow-hidden bg-cover bg-no-repeat group"
                onClick={() =>
                  window.open(
                    `https://www.google.com/search?q=${item.name}`,
                    "_blank"
                  )
                }
              >
                <img
                  src={item.profile_path ? baseUrl + item.profile_path : avatar}
                  alt={item.name}
                  className="w-full h-full object-cover object-top block cursor-pointer transition duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="sm:text-base text-sm font-semibold">
                {item.name}
              </div>
              <div className="sm:text-base text-sm opacity-60">
                {item.character}
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Cast;
