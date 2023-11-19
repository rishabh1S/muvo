"use client";
import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar, MovieList, InfoModal, MovieCard } from "@/src/components";
import { useFavorites, useInfoModal } from "@/src/hooks";
import { getTVorMovieDetailsByID } from "@/public/utils";

export default function FavList() {
  const session = useSession();
  const router = useRouter();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  console.log(favorites);
  const [extendedFavorites, setExtendedFavorites] = useState([]);

  useEffect(() => {
    const fetchExtendedFavorites = async () => {
      try {
        const extendedDataPromises = favorites.map(async (favorite) => {
          const { mediaType, mediaId } = favorite;
          const extendedData = await getTVorMovieDetailsByID(
            mediaType,
            mediaId
          );
          return extendedData;
        });

        const extendedDataResults = await Promise.all(extendedDataPromises);
        setExtendedFavorites(extendedDataResults);
      } catch (error) {
        console.error("Error fetching extended favorites:", error);
      }
    };

    if (session?.status !== "authenticated") {
      router.push("/authenticate");
    } else {
      fetchExtendedFavorites();
    }
  }, [session?.status, router, favorites]);

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className="py-40">
        <div className="px-4 md:px-12 mt-4 space-y-8">
          <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
            My List
          </p>
          <div className="grid grid-cols-4 gap-2">
            {extendedFavorites.map((extendedData, index) => (
              <MovieCard key={index} data={extendedData} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}