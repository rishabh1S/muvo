"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FixedFooter = () => {
  const router = useRouter();
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedVisibility = localStorage.getItem("isSectionVisible");
    setIsSectionVisible(
      storedVisibility === null || storedVisibility === "true"
    );
    setIsLoading(false);
  }, []);

  const handleCloseClick = () => {
    setIsSectionVisible(false);
    localStorage.setItem("isSectionVisible", "false");
  };

  if (isLoading) {
    return (
      <div className="fixed bottom-0 left-0 w-full px-2 sm:px-5 py-2 sm:py-5 invisible" />
    );
  }
  return (
    <>
      {isSectionVisible && (
        <div className="fixed bottom-0 left-0 w-full bg-body/80 backdrop-blur-sm border-t border-solid border-gray-300 border-opacity-30 transition-opacity px-2 sm:px-5 py-2 sm:py-5 ">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-2xl font-semibold text-white">
                Muvo is better on the app
              </h2>
              <p className="text-[6px] sm:text-sm text-gray-300">
                Download the Muvo app for an enhanced experience.
              </p>
            </div>
            <div>
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push("/getTheApp")}
                  className="text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:outline-none font-medium  rounded-sm sm:rounded-lg text-[6px] sm:text-xl sm:px-6 px-2 sm:py-3 py-1"
                >
                  Get the app
                </button>
                <button
                  onClick={handleCloseClick}
                  className="sm:px-6 px-2 sm:py-3 py-1 rounded text-white text-[6px] sm:text-xl font-medium"
                >
                  Not now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FixedFooter;
