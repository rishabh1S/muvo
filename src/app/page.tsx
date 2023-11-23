"use client";
import React, { useEffect, useState } from "react";

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

export default function Home() {
  const session = useSession();
  const router = useRouter();
  const { data: moviesTrending } = useMovieList("trending", "movie");
  const { data: tvTrending } = useMovieList("trending", "tv");
  const { data: moviesPopular } = useMovieList("popular", "movie");
  const { data: tvPopular } = useMovieList("popular", "tv");
  const { data: moviesToprated } = useMovieList("toprated", "movie");
  const { data: tvToprated } = useMovieList("toprated", "tv");
  const { isOpen, closeModal } = useInfoModal();
  const [mediaType, setMediaType] = useState("");

  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/auth");
    }
  }, [session?.status, router]);

  useEffect(() => {
    const randomMediaType = Math.random() > 0.5 ? "tv" : "movie";
    setMediaType(randomMediaType);
  }, []);

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard mediaType={mediaType} />
      <div className="pb-40">
        <MovieList
          title="Trending Movies"
          data={moviesTrending}
          mediaType="movie"
        />
        <MovieList title="Trending Tv Shows" data={tvTrending} mediaType="tv" />
        <MovieList
          title="Popular Movies on NextFlix"
          data={moviesPopular}
          mediaType="movie"
        />
        <MovieList
          title="Popular Series on NextFlix"
          data={tvPopular}
          mediaType="tv"
        />
        <MovieList
          title="Top Rated Movies"
          data={moviesToprated}
          mediaType="movie"
        />
        <MovieList title="Top Rated Shows" data={tvToprated} mediaType="tv" />
      </div>
      <Footer />
    </>
  );
}
