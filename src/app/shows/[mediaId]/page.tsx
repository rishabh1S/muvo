"use client";
import {
  CircleLoader,
  FavoriteButton,
  Navbar,
  Footer,
  VideoModal,
  CircleRating,
  MediaList,
  Cast,
  InfoModal,
  MediaVideos,
} from "@/src/components";
import {
  useCredits,
  useMedia,
  useRecommend,
  useInfoModal,
  useEpisode,
  useSimilar,
} from "@/src/hooks";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Episode, Genre } from "@/src/types";
import Link from "next/link";
import { baseUrl } from "@/public/utils";
import { FaChevronDown } from "react-icons/fa6";
import "react-multi-carousel/lib/styles.css";
import { RiMovie2Line } from "react-icons/ri";
import { BsFillPlayFill } from "react-icons/bs";
import { useSession } from "next-auth/react";

const TvSelection = () => {
  const session = useSession();
  const router = useRouter();
  const path = usePathname();
  const params = useParams() as { mediaId: string };
  const { mediaId } = params;
  const mediaType = "tv";
  const { data, isLoading } = useMedia(mediaType, mediaId);
  const { data: credits } = useCredits(mediaType, mediaId);
  const { data: mediaRecommended } = useRecommend(mediaType, mediaId);
  const { data: mediaSimilar } = useSimilar(mediaType, mediaId);
  const { isOpen, closeModal } = useInfoModal();
  const [show, setShow] = useState(false);
  const [videoKey, setVideoKey] = useState("");
  const [selectedSeason, setSelectedSeason] = useState(data?.seasons[0]);
  const { data: episodeDetails } = useEpisode(
    mediaId,
    selectedSeason?.season_number || 1
  );
  const isComingSoon = new Date(data?.first_air_date) > new Date();
  const creator = credits?.crew.filter(
    (f: any) => f.job === "Executive Producer"
  );
  const key =
    data?.videos?.results.find(
      (video: { type: string }) => video.type === "Trailer"
    )?.key || data?.videos?.results[0]?.key;

  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/auth");
    }
    return () => {
      closeModal();
    };
  }, [session?.status, router, closeModal, path]);

  const handleSeasonChange = (event: { target: { value: any } }) => {
    const selectedSeasonNumber = Number(event.target.value);
    const selectedSeasonData = data?.seasons.find(
      (season: { season_number: number }) =>
        season.season_number === selectedSeasonNumber
    );
    setSelectedSeason(selectedSeasonData);
  };

  if (isLoading) {
    return <CircleLoader />;
  }

  return (
    <div className="bg-body min-h-screen">
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className="sm:h-[500px] h-[300px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-body/50 to-body"></div>
        <img
          src={`${baseUrl}/${data?.backdrop_path}`}
          alt="data?.title"
          className="w-full h-auto"
        ></img>
      </div>
      <div className="max-w-7xl mx-auto p-4 flex flex-col gap-12 pb-6">
        <div className="-mt-[250px] flex sm:flex-row flex-col items-center relative z-10 gap-3">
          <img
            src={`${baseUrl}/${data?.poster_path}`}
            alt="data?.title"
            className="sm:w-[200px] w-36 sm:h-[300px]"
          ></img>
          <div className="mx-auto flex flex-col gap-3">
            <div className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold sm:mb-4 text-center">
              {data?.name}
            </div>
            <div className="flex items-center justify-center sm:gap-3 gap-1">
              <p className="text-white font-semibold sm:text-lg">
                {new Date(
                  data?.release_date || data?.first_air_date
                ).getFullYear()}
              </p>
              <span className="text-white">|</span>
              <p className="text-white sm:text-lg">
                {`${data?.number_of_seasons} Seasons`}
              </p>
              <span className="text-white">|</span>
              <p className="text-violet-500 sm:text-lg">
                {data?.genres?.map((genre: Genre) => genre.name).join(", ")}
              </p>
              <div className="sm:absolute right-0">
                {data?.id && (
                  <Link
                    href={`https://www.themoviedb.org/tv/${data?.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    <RiMovie2Line size={24} className="lg:hidden" />
                    <RiMovie2Line size={34} className="hidden lg:block" />
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              {!isComingSoon ? (
                <Link
                  href={`/shows/${mediaId}/1/1`}
                  passHref
                  className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition text-black"
                >
                  <BsFillPlayFill
                    size={24}
                    className="w-4 md:w-7 text-black mr-1"
                  />
                  Watch Now
                </Link>
              ) : (
                <p className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition text-black pointer-events-none">
                  Coming Soon
                </p>
              )}
              <div
                onClick={() => {
                  setShow(true);
                  setVideoKey(key);
                }}
                className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition text-black cursor-pointer"
              >
                <BsFillPlayFill
                  size={24}
                  className="w-4 md:w-7 text-black mr-1"
                />
                Play Trailer
              </div>
              <VideoModal
                show={show}
                setShow={setShow}
                videoKey={videoKey}
                setVideoKey={
                  setVideoKey as React.Dispatch<
                    React.SetStateAction<string | null>
                  >
                }
              ></VideoModal>
              <div className="sm:w-12 w-8 sm:h-12 h-8">
                <CircleRating rating={data?.vote_average.toFixed(1)} />
              </div>
              <FavoriteButton mediaType="tv" mediaId={data?.id.toString()} />
            </div>
            <div className="text-white drop-shadow-xl px-4">
              <div className="text-3xl mb-2 font-light">Overview</div>
              <div className="text-base leading-[22px] text-justify">
                {data?.overview}
              </div>
            </div>
            <div className="flex justify-between relative gap-3 text-white px-4">
              {creator?.length > 0 && (
                <div>
                  <span className="text-neutral-400 text-base mr-1">
                    Creators:{" "}
                  </span>
                  <span className="text-base leading-[22px] opacity-75">
                    {creator?.map((d: any, i: number) => (
                      <span key={i}>
                        {d.name}
                        {creator.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Cast cast={credits?.cast} />
      <section className="px-4 md:px-12 py-4">
        <div className="text-white text-3xl sm:mb-4 flex items-end gap-2">
          Episodes{" "}
          <span className="border-l border-neutral-400 pl-2 text-xl text-neutral-400">
            {data?.name}
          </span>
        </div>
        <div className="relative inline-block">
          <select
            className="h-10 text-xl pr-10 bg-transparent text-white border-none focus:outline-none appearance-none cursor-pointer"
            onChange={handleSeasonChange}
          >
            {data?.seasons
              .filter((season: { name: string }) => season.name !== "Specials")
              .map(
                (
                  season: {
                    name: string;
                    season_number: number;
                  },
                  i: number
                ) => (
                  <option
                    key={i}
                    value={season.season_number}
                    className="bg-black"
                  >
                    {season.name}
                  </option>
                )
              )}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
            <FaChevronDown className="text-[#8dc53e]" />
          </div>
        </div>
        <div className="py-4 text-white text-lg">
          <div className="font-semibold text-base">
            Release Year: {new Date(episodeDetails?.air_date).getFullYear()}
          </div>
          <div className="text-neutral-400 my-1 text-base leading-[22px] sm:w-3/4">
            {episodeDetails?.overview || data?.overview}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2">
          {episodeDetails?.episodes?.map((episode: Episode) => (
            <Link
              key={episode.id}
              className="rounded-md text-white"
              href={`/shows/${mediaId}/${episode.season_number}/${episode.episode_number}`}
            >
              <div className="relative overflow-hidden bg-cover bg-no-repeat group">
                <img
                  src={
                    episode.still_path
                      ? `${baseUrl}${episode.still_path}`
                      : "/images/no-backdrop.png"
                  }
                  alt={`Episode ${episode.episode_number}`}
                  className="cursor-pointer transition duration-300 ease-in-out group-hover:scale-110 w-full h-48 object-cover"
                />
              </div>
              <div className="my-3 flex justify-between">
                <span className="inline-block font-medium">
                  {episode.episode_number}. {episode.name}
                </span>
                <span className="text-neutral-400 font-extralight">
                  {episode.runtime}m
                </span>
              </div>
              <p className="text-neutral-400 text-xs leading-[18px] text-justify">
                {episode.overview.split(" ").slice(0, 25).join(" ")}
                {episode.overview.split(" ").length > 25 ? "..." : ""}
              </p>
            </Link>
          ))}
        </div>
      </section>
      {data?.videos?.results?.length > 0 && (
        <MediaVideos
          title="Official Videos"
          videos={data?.videos}
          setShow={setShow}
          setVideoKey={setVideoKey}
        />
      )}
      <MediaList
        title="Recommended Tv Shows"
        data={mediaRecommended}
        mediaType="tv"
      />
      <div className="pb-20">
        <MediaList
          title="Similar Tv Shows"
          data={mediaSimilar}
          mediaType="tv"
        />
      </div>
      <Footer />
    </div>
  );
};

export default TvSelection;
