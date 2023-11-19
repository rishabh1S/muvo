"use client";
import React, { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar, Billboard, MovieList, InfoModal } from "@/src/components";
import { useMovieList, useInfoModal } from "@/src/hooks";

export default function Series() {
  const session = useSession();
  const router = useRouter();
  const { data: moviesTrending = [] } = useMovieList("trending", "tv");
  const { data: moviesPopular = [] } = useMovieList("popular", "tv");
  const { data: moviesToprated = [] } = useMovieList("toprated", "tv");
  const { isOpen, closeModal } = useInfoModal();

  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/authenticate");
    }
  }, [session?.status, router]);
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard mediaType="tv" />
      <div className="pb-40">
        <MovieList title="Trending Now" data={moviesTrending} />
        <MovieList title="Popular on NextFlix" data={moviesPopular} />
        <MovieList title="Top Rated" data={moviesToprated} />
      </div>
    </>
  );
}
