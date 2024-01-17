"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  Billboard,
  MediaList,
  InfoModal,
  Footer,
} from "@/src/components";
import { useMediaList, useInfoModal } from "@/src/hooks";
import { usePathname } from "next/navigation";

export default function Home() {
  const path = usePathname();
  const { data: moviesTrending } = useMediaList("trending", "movie");
  const { data: tvTrending } = useMediaList("trending", "tv");
  const { data: moviesPopular } = useMediaList("popular", "movie");
  const { data: tvPopular } = useMediaList("popular", "tv");
  const { data: moviesToprated } = useMediaList("toprated", "movie");
  const { data: tvToprated } = useMediaList("toprated", "tv");
  const { isOpen, closeModal } = useInfoModal();
  const [mediaType, setMediaType] = useState("");

  useEffect(() => {
    const randomMediaType = Math.random() > 0.5 ? "tv" : "movie";
    setMediaType(randomMediaType);
    closeModal();
  }, [closeModal, path]);

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard mediaType={mediaType} />
      <div className="sm:pb-40 pb-10">
        <MediaList
          title="Trending Movies"
          data={moviesTrending}
          mediaType="movie"
        />
        <MediaList title="Trending Tv Shows" data={tvTrending} mediaType="tv" />
        <MediaList
          title="Popular Movies"
          data={moviesPopular}
          mediaType="movie"
        />
        <MediaList title="Popular Tv Shows" data={tvPopular} mediaType="tv" />
        <MediaList
          title="Top Rated Movies"
          data={moviesToprated}
          mediaType="movie"
        />
        <MediaList title="Top Rated Shows" data={tvToprated} mediaType="tv" />
      </div>
      <Footer />
    </>
  );
}
