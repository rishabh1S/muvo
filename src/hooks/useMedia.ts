import useSwr from "swr";
import fetcher from "@/src/libs/fetcher";

const useMedia = (mediaType?: string, mediaId?: string) => {
  const { data, error, isLoading } = useSwr(
    mediaType && mediaId
      ? `/api/media?mediaType=${mediaType}&mediaId=${mediaId}`
      : null,
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

export default useMedia;
