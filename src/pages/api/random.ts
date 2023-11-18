import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/src/libs/serverAuth";
import { getTrendingMedias } from "@/public/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const trendingMovies = await getTrendingMedias("movie");
    const randomIndex = Math.floor(Math.random() * trendingMovies.length);

    const randomMovie = trendingMovies[randomIndex];

    return res.status(200).json(randomMovie);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
