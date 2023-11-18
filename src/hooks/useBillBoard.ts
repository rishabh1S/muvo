import useSwr from "swr";
import fetcher from "@/src/libs/fetcher";

const useBillboard = (mediaType: string) => {
  const { data, error, isLoading } = useSwr(
    `/api/random?mediaType=${mediaType}`,
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
