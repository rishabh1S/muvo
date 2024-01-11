import React from "react";
import { TailSpin } from "react-loader-spinner";

export default function CircleLoader() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <TailSpin
        height="60"
        width="60"
        color="#8dc53e"
        ariaLabel="tail-spin-loading"
        radius="1"
      />
    </div>
  );
}
