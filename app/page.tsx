"use client";
import React, { useEffect } from "react";

import { Navbar } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Billboard, MovieList } from "@/components";
// import InfoModal from '@/components/InfoModal';
import useMovieList from "@/app/hooks/useMovieList";
// import useFavorites from '@/hooks/useFavorites';
// import useInfoModalStore from '@/hooks/useInfoModalStore';

export default function Home() {
  const session = useSession();
  const router = useRouter();
  const { data: movies = [] } = useMovieList();
  // const { data: favorites = [] } = useFavorites();
  // const {isOpen, closeModal} = useInfoModalStore();

  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/authenticate");
    }
  }, [session?.status, router]);
  return (
    <>
      {/* <InfoModal visible={isOpen} onClose={closeModal} /> */}
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        {/*<MovieList title="My List" data={favorites} /> */}
      </div>
    </>
  );
}
