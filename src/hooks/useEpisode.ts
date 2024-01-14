import useSwr from "swr";
import fetcher from "@/src/libs/fetcher";

const useEpisode = (mediaId?: string, season?: string) => {
  const { data, error, isLoading } = useSwr(
    `/api/episode?mediaId=${mediaId}&season=${season}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    data,
    error,
    isLoading,
  };
};

export default useEpisode;
