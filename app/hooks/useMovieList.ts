import useSwr from "swr";
import fetcher from "@/app/libs/fetcher";

const useMovies = (type: string) => {
  const { data, error, isLoading } = useSwr(
    `/api/movies?type=${type}`,
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

export default useMovies;
