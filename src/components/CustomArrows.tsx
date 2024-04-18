import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface ArrowProps {
  onClick: () => void;
}

const CustomLeftArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      className="absolute top-18 left-4 p-3 bg-black/60 rounded-full"
      onClick={() => onClick()}
    >
      <BsChevronLeft size={24} color="white" />
    </button>
  );
};

const CustomRightArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      className="absolute top-18 right-2 p-3 bg-black/60 rounded-full"
      onClick={() => onClick()}
    >
      <BsChevronRight size={24} color="white" />
    </button>
  );
};

export { CustomRightArrow, CustomLeftArrow };
