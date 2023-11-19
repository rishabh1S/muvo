import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/src/libs/prismadb";
import serverAuth from "@/src/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);

    const favoritedMedias = await prismadb.favouriteIds.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return res.status(200).json(favoritedMedias);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
