import useSwr from "swr";
import fetcher from "@/src/libs/fetcher";

const useSimilar = (mediaType?: string, mediaId?: string) => {
  const { data, error, isLoading } = useSwr(
    `/api/similar?mediaType=${mediaType}&mediaId=${mediaId}`,
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

export default useSimilar;
