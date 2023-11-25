"use client";
import React, { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Navbar,
  Billboard,
  MediaList,
  InfoModal,
  Footer,
} from "@/src/components";
import { useMediaList, useInfoModal } from "@/src/hooks";

export default function Series() {
  const session = useSession();
  const router = useRouter();
  const { data: moviesTrending = [] } = useMediaList("trending", "tv");
  const { data: moviesPopular = [] } = useMediaList("popular", "tv");
  const { data: moviesToprated = [] } = useMediaList("toprated", "tv");
  const { isOpen, closeModal } = useInfoModal();

  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/auth");
    }
  }, [session?.status, router]);
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard mediaType="tv" />
      <div className="pb-40">
        <MediaList title="Trending Now" data={moviesTrending} mediaType="tv" />
        <MediaList
          title="Popular on NextFlix"
          data={moviesPopular}
          mediaType="tv"
        />
        <MediaList title="Top Rated" data={moviesToprated} mediaType="tv" />
      </div>
      <Footer />
    </>
  );
}
