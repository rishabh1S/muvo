import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { toast } from "sonner";
import { useCurrentUser, useFavorites } from "../hooks";

interface FavoriteButtonProps {
  mediaType: string;
  mediaId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  mediaType,
  mediaId,
}) => {
  const {
    data: favoritedMedias,
    isLoading,
    mutate: mutateFavorites,
  } = useFavorites();
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  const isFavorite = useMemo(() => {
    if (!favoritedMedias || isLoading || !currentUser) {
      return false;
    }

    return favoritedMedias.some(
      (favorite: { mediaType: string; mediaId: string }) =>
        favorite.mediaType === mediaType && favorite.mediaId === mediaId
    );
  }, [favoritedMedias, isLoading, currentUser, mediaType, mediaId]);

  const toggleFavorites = useCallback(async () => {
    try {
      let response;
      if (isFavorite) {
        response = await axios.delete("/api/favorite", {
          data: { mediaType, mediaId },
        });
        toast.success("Removed from favourites");
      } else {
        response = await axios.post("/api/favorite", { mediaType, mediaId });
        toast.success("Added to favourites");
      }

      const updatedFavoriteIds = response?.data?.favoriteIds;

      mutateCurrentUser({
        ...currentUser,
        favoriteIds: updatedFavoriteIds,
      });

      mutateFavorites();
    } catch (error) {
      console.error("Error toggling favorites:", error);
    }
  }, [
    isFavorite,
    mediaType,
    mediaId,
    currentUser,
    mutateCurrentUser,
    mutateFavorites,
  ]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon
        size={24}
        className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6"
      />
    </div>
  );
};

export default FavoriteButton;
