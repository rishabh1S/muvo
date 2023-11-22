"use client";
import React, { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Navbar,
  Billboard,
  MovieList,
  InfoModal,
  Footer,
} from "@/src/components";
import { useMovieList, useInfoModal } from "@/src/hooks";

export default function Movies() {
  const session = useSession();
  const router = useRouter();
  const { data: moviesTrending } = useMovieList("trending", "movie");
  const { data: moviesPopular } = useMovieList("popular", "movie");
  const { data: moviesToprated } = useMovieList("toprated", "movie");
  const { isOpen, closeModal } = useInfoModal();

  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard mediaType="movie" />
      <div className="pb-40">
        <MovieList
          title="Trending Now"
          data={moviesTrending}
          mediaType="movie"
        />
        <MovieList
          title="Popular on NextFlix"
          data={moviesPopular}
          mediaType="movie"
        />
        <MovieList title="Top Rated" data={moviesToprated} mediaType="movie" />
      </div>
      <Footer />
    </>
  );
}
