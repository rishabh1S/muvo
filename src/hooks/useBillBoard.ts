import useSwr from "swr";
import fetcher from "@/src/libs/fetcher";

const useBillboard = (mediaType: string) => {
  const { data, error, isLoading } = useSwr(
    mediaType ? `/api/random?mediaType=${mediaType}` : null,
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

export default useBillboard;
