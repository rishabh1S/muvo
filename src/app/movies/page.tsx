"use client";
import React, { useEffect } from "react";
import {
  Navbar,
  Billboard,
  MediaList,
  InfoModal,
  Footer,
} from "@/src/components";
import { useMediaList, useInfoModal } from "@/src/hooks";
import { usePathname } from "next/navigation";

export default function Movies() {
  const path = usePathname();
  const { data: moviesTrending } = useMediaList("trending", "movie");
  const { data: moviesPopular } = useMediaList("popular", "movie");
  const { data: moviesToprated } = useMediaList("toprated", "movie");
  const { isOpen, closeModal } = useInfoModal();

  useEffect(() => {
    closeModal();
  }, [closeModal, path]);

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard mediaType="movie" />
      <div className="sm:pb-40 pb-10">
        <MediaList
          title="Trending Now"
          data={moviesTrending}
          mediaType="movie"
        />
        <MediaList title="Popular" data={moviesPopular} mediaType="movie" />
        <MediaList title="Top Rated" data={moviesToprated} mediaType="movie" />
      </div>
      <Footer />
    </>
  );
}
