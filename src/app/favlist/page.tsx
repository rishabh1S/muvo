"use client";
import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Navbar,
  InfoModal,
  MediaCard,
  Footer,
  SkeletonLoader,
} from "@/src/components";
import { useFavorites, useInfoModal } from "@/src/hooks";
import { getTVorMovieDetailsByID } from "@/public/utils";

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
          <p className="text-white text-3xl md:text-5xl font-bold">My Shows</p>
        </div>
      </div>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="sm:pb-40 pb-20">
          <div className="px-4 md:px-12 mt-4 space-y-8">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2">
              {extendedFavorites.map((extendedData, index) => (
                <MediaCard
                  key={index}
                  mediaType={extendedData.mediaType}
                  data={extendedData}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
