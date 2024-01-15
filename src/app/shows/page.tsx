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

export default function Shows() {
  const session = useSession();
  const router = useRouter();
  const { data: tvTrending = [] } = useMediaList("trending", "tv");
  const { data: tvPopular = [] } = useMediaList("popular", "tv");
  const { data: tvToprated = [] } = useMediaList("toprated", "tv");
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
      <div className="sm:pb-40 pb-10">
        <MediaList title="Trending Now" data={tvTrending} mediaType="tv" />
        <MediaList title="Popular" data={tvPopular} mediaType="tv" />
        <MediaList title="Top Rated" data={tvToprated} mediaType="tv" />
      </div>
      <Footer />
    </>
  );
}
