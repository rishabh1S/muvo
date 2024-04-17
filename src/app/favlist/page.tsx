"use client";
import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Navbar,
  InfoModal,
  Footer,
  SkeletonLoader,
  MediaSection,
} from "@/src/components";
import { useFavorites, useInfoModal } from "@/src/hooks";
import { getTVorMovieDetailsByID } from "@/src/utils";

export default function FavList() {
  const session = useSession();
  const router = useRouter();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  const [extendedFavorites, setExtendedFavorites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExtendedFavorites = async () => {
      try {
        const extendedDataPromises = favorites.map(
          async (favorite: { mediaType: string; mediaId: string }) => {
            const { mediaType, mediaId } = favorite;
            const extendedData = await getTVorMovieDetailsByID(
              mediaType,
              mediaId
            );
            return { mediaType, ...extendedData };
          }
        );

        const extendedDataResults = await Promise.all(extendedDataPromises);
        setExtendedFavorites(extendedDataResults);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching extended favorites:", error);
        setIsLoading(false);
      }
    };

    if (session?.status !== "authenticated") {
      router.push("/auth");
    } else {
      fetchExtendedFavorites();
    }
  }, [session?.status, router, favorites]);

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className="sm:h-[260px] h-[180px] relative overflow-hidden">
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-transparent via-transparent to-body"></div>
        <img
          src="/images/hero.png"
          alt="Hero Banner"
          className="w-full h-auto"
        ></img>
        <div className="absolute top-[70%] px-4 md:px-12">
          <p className="text-white text-3xl md:text-5xl font-bold">
            My Favourites
          </p>
        </div>
      </div>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="sm:pb-40 pb-10 bg-gradient-linear">
          <div className="px-4 md:px-12 mt-4 space-y-8">
            {extendedFavorites.length === 0 ? (
              <div className="flex flex-col items-center sm:justify-end justify-center sm:gap-10 gap-6 h-[40vh]">
                <div className="text-center space-y-2">
                  <h1 className="sm:text-7xl text-4xl font-black text-white">
                    Nothing to see here yet.
                  </h1>
                  <h2 className="sm:text-3xl text-xl text-zinc-400">
                    Start adding your shows to the favorites section
                  </h2>
                </div>
                <button
                  onClick={() => router.push("/")}
                  className="border text-gray-200 border-gray-200 shadow-lg hover:bg-gray-200 hover:text-gray-900 transition duration-300 font-bold sm:py-2 sm:px-4 py-1 px-2 rounded-full cursor-pointer"
                >
                  Go to Home Page
                </button>
              </div>
            ) : (
              <MediaSection mediaData={extendedFavorites} />
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
