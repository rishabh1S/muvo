"use client";
import React from "react";
import {
  Navbar,
  Billboard,
  MediaList,
  InfoModal,
  Footer,
  FixedFooter,
} from "@/src/components";
import { useMediaList, useInfoModal } from "@/src/hooks";

export default function Movies() {
  const { data: moviesTrending } = useMediaList("trending", "movie");
  const { data: moviesPopular } = useMediaList("popular", "movie");
  const { data: moviesToprated } = useMediaList("toprated", "movie");
  const { isOpen, closeModal } = useInfoModal();

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
      <FixedFooter />
      <Footer />
    </>
  );
}
