import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/src/libs/prismadb";
import serverAuth from "@/src/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);

      const { mediaType, mediaId } = req.body;

      const existingFavorite = await prismadb.favouriteIds.findUnique({
        where: {
          id: currentUser.id,
        },
      });

      if (existingFavorite) {
        return res.status(200).json(currentUser);
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            create: { mediaType, mediaId },
          },
        },
      });

      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res);

      const { mediaType, mediaId } = req.body;

      const updatedFavoriteIds = without(currentUser.favoriteIds, {
        mediaType,
        mediaId,
      });

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(200).json(updatedUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
