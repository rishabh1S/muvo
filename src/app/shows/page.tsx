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

export default function Shows() {
  const { data: tvTrending = [] } = useMediaList("trending", "tv");
  const { data: tvPopular = [] } = useMediaList("popular", "tv");
  const { data: tvToprated = [] } = useMediaList("toprated", "tv");
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard mediaType="tv" />
      <div className="sm:pb-40 pb-10 bg-gradient-linear">
        <MediaList title="Trending Now" data={tvTrending} mediaType="tv" />
        <MediaList title="Popular" data={tvPopular} mediaType="tv" />
        <MediaList title="Top Rated" data={tvToprated} mediaType="tv" />
      </div>
      <FixedFooter />
      <Footer />
    </>
  );
}
