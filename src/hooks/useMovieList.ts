import useSwr from "swr";
import fetcher from "@/src/libs/fetcher";

const useMovieList = (type: string, mediaType: string) => {
  const { data, error, isLoading } = useSwr(
    `/api/media?type=${type}&mediaType=${mediaType}`,
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

export default useMovieList;
