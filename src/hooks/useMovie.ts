import useSwr from "swr";
import fetcher from "@/src/libs/fetcher";

const useMovie = (mediaType?: string, mediaId?: string) => {
  const { data, error, isLoading } = useSwr(
    mediaId ? `/api/media/${mediaType}/${mediaId}` : null,
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

export default useMovie;
