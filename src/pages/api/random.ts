import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/src/libs/serverAuth";
import { getTrendingMedias } from "@/src/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const { mediaType } = req.query;

    const trendingMedias = await getTrendingMedias(mediaType as string);
    if (!trendingMedias || trendingMedias.length === 0) {
      return res.status(404).json({ error: "No trending media found." });
    }
    const randomIndex = Math.floor(Math.random() * trendingMedias.length);

    const randomMovie = trendingMedias[randomIndex];

    return res.status(200).json(randomMovie);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
