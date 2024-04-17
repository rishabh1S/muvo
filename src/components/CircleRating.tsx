"use client";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircleRatingProps {
  rating: number;
}

const CircleRating: React.FC<CircleRatingProps> = ({ rating }) => {
  const pathColor = rating < 5 ? "red" : rating < 7 ? "orange" : "green";

  return (
    <div className="bg-black rounded-full sm:p-2">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating?.toString()}
        styles={buildStyles({
          pathColor,
          textColor: "white",
          textSize: "40px",
        })}
      />
    </div>
  );
};

export default CircleRating;
