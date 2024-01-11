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

export default function Movies() {
  const session = useSession();
  const router = useRouter();
  const { data: moviesTrending } = useMediaList("trending", "movie");
  const { data: moviesPopular } = useMediaList("popular", "movie");
  const { data: moviesToprated } = useMediaList("toprated", "movie");
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
      <Billboard mediaType="movie" />
      <div className="pb-40">
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
