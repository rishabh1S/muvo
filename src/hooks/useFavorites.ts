import useSwr from "swr";
import fetcher from "../libs/fetcher";
import { useSession } from "next-auth/react";

const useFavorites = () => {
  const { data, error, isLoading, mutate } = useSwr(
    useSession().data ? "/api/favorites" : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (error) {
    console.error("Error fetching favorites:", error);
  }

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useFavorites;
