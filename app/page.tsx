"use client";
import React, { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar, Billboard, MovieList, InfoModal } from "@/components";
import useMovieList from "@/app/hooks/useMovieList";
import useFavorites from "@/app/hooks/useFavorites";
import useInfoModal from "@/app/hooks/useInfoModal";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
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
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
