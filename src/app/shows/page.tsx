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

export default function Shows() {
  const path = usePathname();
  const { data: tvTrending = [] } = useMediaList("trending", "tv");
  const { data: tvPopular = [] } = useMediaList("popular", "tv");
  const { data: tvToprated = [] } = useMediaList("toprated", "tv");
  const { isOpen, closeModal } = useInfoModal();

  useEffect(() => {
    closeModal();
  }, [closeModal, path]);

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard mediaType="tv" />
      <div className="sm:pb-40 pb-10">
        <MediaList title="Trending Now" data={tvTrending} mediaType="tv" />
        <MediaList title="Popular" data={tvPopular} mediaType="tv" />
        <MediaList title="Top Rated" data={tvToprated} mediaType="tv" />
      </div>
      <Footer />
    </>
  );
}
